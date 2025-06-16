using System;
using System.IO;
using System.Linq;
using System.Text;

namespace cgmsharp
{
    public class CGMImage
    {
        public string fileName = string.Empty;
        public string metafileDescription = string.Empty;
        public FileVersion metafileVersion;

        public int intPrecision = sizeof(short) * 8;
        public FPType realPrecision = FPType._32BitFix;
        
        public VDCType vdcType;
        public int vdcIntPrecision = sizeof(short) * 8;
        public FPType vdcRealPrecision = FPType._32BitFix;
        
        public int indexPrecision = sizeof(short) * 8;
        public int colorIndexPrecision = sizeof(byte) * 8;
        public int colorPrecision = sizeof(byte) * 8;
        public int maxColorIndex = 255;

        public ColorModel colorModel;
        public int colorValueExtent = 0;
    }

    public class CGMParser
    {
        private BinaryReader reader = null!;

        public CGMImage ParseCGM(Stream dataStream)
        {
            var mReader = new MemoryStream();
            dataStream.CopyTo(mReader);
            mReader.Position = 0;
            reader = new BinaryReader(mReader);
            var output = new CGMImage();

            while (reader.BaseStream.Position != reader.BaseStream.Length)
            {
                if (reader.BaseStream.Position % 2 != 0)
                {
                    reader.ReadByte();
                }

                var command = ReadCommand();

                switch (command.Code)
                {
                    case EC.BeginMetafile:
                        output.fileName = ReadString();
                        break;
                    case EC.VDCType:
                        output.vdcType = (VDCType)reader.ReadInt16BE();
                        break;
                    case EC.IntegerPrecision:
                        output.intPrecision = reader.ReadInt16BE();
                        break;
                    case EC.RealPrecision:
                        var fpOrFixed = (PrecisionChoice)reader.ReadInt16BE();
                        var wholeWidth = reader.ReadInt16BE();
                        var fieldWidth = reader.ReadInt16BE();
                        if (fpOrFixed == PrecisionChoice.Floating)
                        {
                            output.realPrecision = wholeWidth == 9 ? FPType._32BitFloat : FPType._64BitFloat;
                        }
                        else
                        {
                            output.realPrecision = wholeWidth == 16 ? FPType._32BitFix : FPType._64BitFix;
                        }
                        break;
                    case EC.IndexPrecision:
                        output.indexPrecision = reader.ReadInt16BE();
                        break;
                    case EC.ColorIndexPrecision:
                        output.colorIndexPrecision = reader.ReadInt16BE();
                        break;
                    case EC.ColourPrecision:
                        output.colorPrecision = reader.ReadInt16BE();
                        break;
                    case EC.MetafileVersion:
                        output.metafileVersion = (FileVersion)reader.ReadInt16BE();
                        break;
                    case EC.MetafileDescription:
                        if (output.metafileDescription == string.Empty) output.metafileDescription = ReadString();
                        else output.metafileDescription += ReadString();
                        break;
                    case EC.MaxColorIndex:
                        output.maxColorIndex = reader.ReadUInt16BE();
                        break;
                    case EC.ColorModel:
                        output.colorModel = (ColorModel)reader.ReadUInt16BE();
                        break;
                    case EC.NoOp:
                        break;
                    default:
                        var bytes = reader.ReadBytesRequired(command.Length);
                        break;
                }
            }

            return output;
        }

        private string ReadString()
        {
            // Doesn't support long form strings (longer than 255 characters)
            var len = reader.ReadByte();
            var output = reader.ReadBytesRequired(len);
            return Encoding.UTF8.GetString(output);
        }

        private Command ReadCommand()
        {
            // Doesn't support partitions
            var command = new Command();
            var word = reader.ReadUInt16BE();
            command.Class = (Class)((word >> 12) & 0xF);
            command.Id = (ushort)((word >> 5) & 0x7F);
            command.Code = (EC)(word & 0xFFE0);
            command.Length = (ushort)(word & 0x1F);
            if (command.Length == 0x1F)
            {
                var word2 = reader.ReadUInt16BE();
                command.Partitioned = (word2 & 0x8000) != 0;
                command.Length = (ushort)(word2 & (0x8000 - 1));
                if (command.Partitioned)
                {
                    throw new InvalidDataException("Partition detected");
                }
            }
            return command;
        }
    }

    public struct Command
    {
        public EC Code;
        public ushort Length;
        public bool Partitioned;
        public Class Class;
        public ushort Id;
    }

    public static class Ext
    {
        public static string B(this int num)
        {
            return SplitBinary(Convert.ToString(num, 2), 32);
        }
        public static string B(this ushort num)
        {
            return SplitBinary(Convert.ToString(num, 2), 16);
        }
        public static string B(this byte num)
        {
            return SplitBinary(Convert.ToString(num, 2), 8);
        }

        private static string SplitBinary(string value, int len)
        {
            var output = value.PadLeft(len, '0');
            var selector = output.Select((x, i) => ((i + 1) % 4 == 0 && i != output.Length - 1) ? x + "_" : x.ToString());
            return string.Join("", selector);
        }

        // Note this MODIFIES THE GIVEN ARRAY then returns a reference to the modified array.
        public static byte[] Reverse(this byte[] b)
        {
            Array.Reverse(b);
            return b;
        }

        public static ushort ReadUInt16BE(this BinaryReader reader)
        {
            var b = reader.ReadBytesRequired(2);
            return (ushort)(b[0] << 8 | b[1]);
        }

        public static short ReadInt16BE(this BinaryReader reader)
        {
            var b = reader.ReadBytesRequired(2);
            return (short)(b[0] << 8 | b[1]);
        }

        public static uint ReadUInt32BE(this BinaryReader reader)
        {
            var b = reader.ReadBytesRequired(4);
            return (uint)(b[0] << 24 | b[1] << 16 | b[2] << 8 | b[3]);
        }

        public static int ReadInt32BE(this BinaryReader reader)
        {
            var b = reader.ReadBytesRequired(4);
            return (int)(b[0] << 24 | b[1] << 16 | b[2] << 8 | b[3]);
        }

        public static byte[] ReadBytesRequired(this BinaryReader reader, int byteCount)
        {
            var result = reader.ReadBytes(byteCount);

            if (result.Length != byteCount)
                throw new EndOfStreamException(string.Format("{0} bytes required from stream, but only {1} returned.", byteCount, result.Length));

            return result;
        }
    }
}
