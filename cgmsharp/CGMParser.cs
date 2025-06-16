using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
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

        // TODO: Convert Read functions to use this for ints
        public int intPrecision = sizeof(short) * 8;
        public FPType realPrecision = FPType._32BitFix;
        
        public VDCType vdcType = VDCType.Integer;
        public int vdcIntPrecision = sizeof(short) * 8;
        public FPType vdcRealPrecision = FPType._32BitFix;
        
        public int indexPrecision = sizeof(short) * 8;
        public int colorIndexPrecision = sizeof(byte) * 8;
        public int colorPrecision = sizeof(byte) * 8;
        public int maxColorIndex = 63;

        public ColorModel colorModel = ColorModel.RGB;
        public int colorValueExtent = 0;

        public List<string> fonts = new List<string>();
        public List<CharSet> charSets = new List<CharSet>();
        public List<Picture> pictures = new List<Picture>();
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
                        output.realPrecision = reader.ReadPrecision();
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
                    case EC.ColorValueExtent:
                        if (output.colorModel == ColorModel.RGB || output.colorModel == ColorModel.CMYK)
                        {
                            // TODO: Save these somewhere
                            var _minr = reader.ReadByte();
                            var _ming = reader.ReadByte();
                            var _minb = reader.ReadByte();
                            var _maxr = reader.ReadByte();
                            var _maxg = reader.ReadByte();
                            var _maxb = reader.ReadByte();
                            // They should be min 0 - max 255
                        }
                        else
                        {
                            throw new NotImplementedException($"{output.colorModel} color model not supported");
                        }

                        break;
                    case EC.FontList:
                        var font = ReadString();
                        output.fonts.Add(font);
                        break;
                    case EC.CharacterSetList:
                        int len = command.Length;
                        while (len != 0)
                        {
                            var charSet = new CharSet();
                            charSet.Type = (CharSetType)reader.ReadUInt16BE();
                            len -= 2;
                            var stringLength = reader.PeekChar() + 1;
                            charSet.Designation = ReadString();
                            len -= stringLength;
                            output.charSets.Add(charSet);
                        }

                        break;
                    case EC.BeginPicture:
                        var picture = ParsePicture();
                        output.pictures.Add(picture);
                        break;
                    case EC.NoOp:
                        break;
                    default:
                        /**
                         * Instructions ignored:
                         * Metafile elements list: I don't understand what an index-pair array is.
                         */
                        var bytes = reader.ReadBytesRequired(command.Length);
                        break;
                }
            }

            return output;
        }

        private Picture ParsePicture()
        {
            var picture = new Picture();
            picture.Name = ReadString();
            Command command;
            do
            {
                command = ReadCommand();
                switch (command.Code)
                {
                    case EC.BackgroundColor:
                        picture.BackgroundColour = ReadColour();
                        break;
                    case EC.ColorSelectionMode:
                        picture.ColorSelectionMode = (ColourSelectionMode)reader.ReadUInt16BE();
                        break;
                    case EC.LineWidthSpecMode:
                        picture.LineWidthMode = (SizeSpecMode)reader.ReadUInt16BE();
                        break;
                    case EC.MarkerSizeSpecMode:
                        picture.MarkerSizeMode = (SizeSpecMode)reader.ReadUInt16BE();
                        break;
                    case EC.EdgeWidthSpecMode:
                        picture.EdgeWidthMode = (SizeSpecMode)reader.ReadUInt16BE();
                        break;
                    case EC.VdcExtent:
                        picture.VdcBottomLeft = reader.ReadPoint();
                        picture.VdcTopRight = reader.ReadPoint();
                        break;
                    case EC.ScalingMode:
                        picture.ScalingMode = (ScalingMode)reader.ReadUInt16BE();
                        if (picture.ScalingMode == ScalingMode.Metric)
                            picture.MetricScalingFactor = reader.ReadSingle();
                        else
                            Debug.Assert(command.Length == 6, "Scaling Factor supplied with abstract scaling mode");
                        break;
                    case EC.VdcIntegerPrecision:
                        picture.VdcIntPrecision = (VdcIntPrecision)reader.ReadUInt16BE();
                        break;
                    case EC.VdcRealPrecision:
                        picture.VdcRealPrecision = reader.ReadPrecision();
                        break;
                    case EC.MitreLimit:
                        picture.MitreLimit = reader.ReadSingle();
                        break;
                    default:
                        reader.ReadBytesRequired(command.Length);
                        break;
                }
            } while (command.Code != EC.EndPicture);

            return picture;
        }

        private string ReadString()
        {
            // Doesn't support long form strings (longer than 255 characters)
            var len = reader.ReadByte();
            var output = reader.ReadBytesRequired(len);
            return Encoding.UTF8.GetString(output);
        }

        private Colour ReadColour()
        {
            return new Colour(
                reader.ReadByte(),
                reader.ReadByte(),
                reader.ReadByte()
            );
        }

        private Command ReadCommand()
        {
            // Commands are padded to start on words
            if (reader.BaseStream.Position % 2 != 0) reader.ReadByte();

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

    public struct CharSet
    {
        public CharSetType Type;
        public string Designation;
    }

    public struct Picture
    {
        public string Name;
        public Colour BackgroundColour;
        public ColourSelectionMode ColorSelectionMode;
        public SizeSpecMode LineWidthMode;
        public SizeSpecMode MarkerSizeMode;
        public SizeSpecMode EdgeWidthMode;
        public Point VdcBottomLeft;
        public Point VdcTopRight;
        public ScalingMode ScalingMode;
        public float MetricScalingFactor;
        public VdcIntPrecision VdcIntPrecision;
        public FPType VdcRealPrecision;
        public float MitreLimit;
    }

    public struct Colour
    {
        public ushort R;
        public ushort G;
        public ushort B;

        public Colour(ushort r, ushort g, ushort b)
        {
            R = r;
            G = g;
            B = b;
        }
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

        public static Point ReadPoint(this BinaryReader reader)
        {
            var point = new Point(
                reader.ReadUInt16BE(),
                reader.ReadUInt16BE()
            );
            return point;
        }

        public static FPType ReadPrecision(this BinaryReader reader)
        {
            var fpOrFixed = (PrecisionChoice)reader.ReadInt16BE();
            var wholeWidth = reader.ReadInt16BE();
            var fieldWidth = reader.ReadInt16BE();
            if (fpOrFixed == PrecisionChoice.Floating)
                return wholeWidth == 9 ? FPType._32BitFloat : FPType._64BitFloat;

            return wholeWidth == 16 ? FPType._32BitFix : FPType._64BitFix;
        }
    }
}
