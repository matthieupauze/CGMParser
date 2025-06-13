using System;
using System.Buffers.Binary;
using System.IO;
using System.Text;

namespace cgmsharp
{
    public class CGM
    {
        public string fileName;

        private BinaryReader reader;
        public CGM(Stream dataStream)
        {
            var mReader = new MemoryStream();
            dataStream.CopyTo(mReader);
            mReader.Position = 0;
            reader = new BinaryReader(mReader);
            ReadFileToEnd();
        }

        private void ReadFileToEnd()
        {
            while (reader.BaseStream.Position != reader.BaseStream.Length)
            {
                var command = ReadCommand();

                switch (command.Code)
                {
                    case EC.BeginMetafile:
                        fileName = ReadString();
                        break;
                    case EC.NoOp:
                        reader.ReadBytes(command.Length);
                        break;
                }
            }
        }

        private string ReadString()
        {
            // Doesn't support long form strings (longer than 255 characters)
            var len = reader.ReadByte();
            var output = reader.ReadBytes(len);
            return Encoding.UTF8.GetString(output);
        }

        private Command ReadCommand()
        {
            // Doesn't support partitions
            var command = new Command();
            var word = reader.ReadUInt16BE();
            command.Code = (EC)((word >> 5) & 0x7FF);
            command.Length = (ushort)(word & 0b1_1111);
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
    }

    public static class Ext
    {
        public static string B(this int num)
        {
            return Convert.ToString(num, 2).PadLeft(sizeof(int), '0');
        }
        public static string B(this ushort num)
        {
            return Convert.ToString(num, 2).PadLeft(sizeof(ushort), '0');
        }
        public static string B(this byte num)
        {
            return Convert.ToString(num, 2).PadLeft(sizeof(byte), '0');
        }

        // Note this MODIFIES THE GIVEN ARRAY then returns a reference to the modified array.
        public static byte[] Reverse(this byte[] b)
        {
            Array.Reverse(b);
            return b;
        }

        public static ushort ReadUInt16BE(this BinaryReader readerRdr)
        {
            return BitConverter.ToUInt16(readerRdr.ReadBytesRequired(sizeof(ushort)).Reverse(), 0);
        }

        public static short ReadInt16BE(this BinaryReader readerRdr)
        {
            return BitConverter.ToInt16(readerRdr.ReadBytesRequired(sizeof(short)).Reverse(), 0);
        }

        public static uint ReadUInt32BE(this BinaryReader readerRdr)
        {
            return BitConverter.ToUInt32(readerRdr.ReadBytesRequired(sizeof(uint)).Reverse(), 0);
        }

        public static int ReadInt32BE(this BinaryReader readerRdr)
        {
            return BitConverter.ToInt32(readerRdr.ReadBytesRequired(sizeof(int)).Reverse(), 0);
        }

        public static byte[] ReadBytesRequired(this BinaryReader readerRdr, int byteCount)
        {
            var result = readerRdr.ReadBytes(byteCount);

            if (result.Length != byteCount)
                throw new EndOfStreamException(string.Format("{0} bytes required from stream, but only {1} returned.", byteCount, result.Length));

            return result;
        }
    }
}
