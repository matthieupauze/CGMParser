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
        public string FileName = string.Empty;
        public string MetafileDescription = string.Empty;
        public FileVersion MetafileVersion;
        public DrawingSet[] DrawingSet = [];

        // TODO: Convert Read functions to use this for ints
        public int IntPrecision = sizeof(short) * 8;
        public FPType RealPrecision = FPType._32BitFix;
        public CharacterCodingAnnouncer Announcer;

        public VDCType VdcType = VDCType.Integer;
        public int VdcIntPrecision = sizeof(short) * 8;
        public FPType VdcRealPrecision = FPType._32BitFix;

        public int IndexPrecision = sizeof(short) * 8;
        public Precision ColorIndexPrecision = Precision._8;
        public Precision ColorPrecision = Precision._8;
        public uint MaxColorIndex = 63;

        public ColorModel ColorModel = ColorModel.RGB;
        public int ColorValueExtent = 0;

        public List<string> Fonts = [];
        public List<CharSet> CharSets = [];
        public List<Picture> Pictures = [];
    }

    public class CGMParser
    {
        private BinaryReader reader = null!;
        private CGMImage metafile = null!;

        public CGMImage ParseCGM(Stream dataStream)
        {
            var mReader = new MemoryStream();
            dataStream.CopyTo(mReader);
            mReader.Position = 0;
            reader = new(mReader);
            metafile = new CGMImage();

            while (reader.BaseStream.Position != reader.BaseStream.Length)
            {
                var command = reader.ReadCommand();

                switch (command.Code)
                {
                    case EC.BeginMetafile:
                        metafile.FileName = ReadString();
                        break;
                    case EC.VDCType:
                        // TODO: Handle case for real
                        metafile.VdcType = (VDCType)reader.ReadInt16BE();
                        break;
                    case EC.IntegerPrecision:
                        metafile.IntPrecision = reader.ReadInt16BE();
                        break;
                    case EC.RealPrecision:
                        metafile.RealPrecision = reader.ReadPrecision();
                        break;
                    case EC.IndexPrecision:
                        metafile.IndexPrecision = reader.ReadInt16BE();
                        break;
                    case EC.ColorIndexPrecision:
                        metafile.ColorIndexPrecision = (Precision)reader.ReadInt16BE();
                        break;
                    case EC.ColourPrecision:
                        metafile.ColorPrecision = (Precision)reader.ReadInt16BE();
                        break;
                    case EC.MetafileVersion:
                        metafile.MetafileVersion = (FileVersion)reader.ReadInt16BE();
                        break;
                    case EC.MetafileDescription:
                        if (metafile.MetafileDescription == string.Empty)
                            metafile.MetafileDescription = ReadString();
                        else metafile.MetafileDescription += ReadString();
                        break;
                    case EC.MaxColorIndex:
                        metafile.MaxColorIndex = ReadPrecision(metafile.ColorIndexPrecision);
                        break;
                    case EC.ColorModel:
                        metafile.ColorModel = (ColorModel)reader.ReadUInt16BE();
                        break;
                    case EC.ColorValueExtent:
                        if (metafile.ColorModel == ColorModel.RGB || metafile.ColorModel == ColorModel.CMYK)
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
                            throw new NotImplementedException($"{metafile.ColorModel} color model not supported");
                        }

                        break;
                    case EC.FontList:
                        int len = command.Length;
                        while (len != 0)
                        {
                            len -= reader.PeekChar() + 1;
                            metafile.Fonts.Add(ReadString());
                        }

                        break;
                    case EC.FontProperties:
                        _ = reader.ReadBytes(command.Length);
                        break;
                    case EC.CharacterSetList:
                        len = command.Length;
                        while (len != 0)
                        {
                            var type = (CharSetType)reader.ReadUInt16BE();
                            len -= 2;
                            var stringLength = reader.PeekChar() + 1;
                            var designation = ReadString();
                            len -= stringLength;
                            metafile.CharSets.Add(new(type, designation));
                        }

                        break;

                    case EC.MetafileElementList:
                        var elCount = reader.ReadUInt16BE();
                        metafile.DrawingSet = new DrawingSet[elCount];
                        for (var i = 0; i < elCount; i++)
                        {
                            _ = reader.ReadInt16BE();
                            metafile.DrawingSet[i] = (DrawingSet)reader.ReadUInt16BE();
                        }

                        break;
                    case EC.CharacterCodingAnnouncer:
                        metafile.Announcer = (CharacterCodingAnnouncer)reader.ReadUInt16BE();
                        break;
                    case EC.BeginPicture:
                        var picture = ParsePicture(metafile);
                        metafile.Pictures.Add(picture);
                        break;
                    case EC.NoOp:
                    case EC.EndMetafile:
                        break;
                    default:
                        _ = reader.ReadBytesRequired(command.Length);
                        break;
                }
            }

            return metafile;
        }

        private Picture ParsePicture(CGMImage metafile)
        {
            var picture = new Picture(ReadString());
            Command command;
            do
            {
                command = reader.ReadCommand();
                switch (command.Code)
                {
                    case EC.BackgroundColor:
                        picture.BackgroundColour = reader.ReadDirectColour();
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
                        picture.VdcBottomLeft = ReadVdcPoint();
                        picture.VdcTopRight = ReadVdcPoint();
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
                    case EC.LineWidth:
                        picture.LineWidth = ReadSizeSpecification(picture.LineWidthMode);
                        break;
                    case EC.LineColor:
                        picture.LineColor = reader.ReadColour(picture);
                        break;
                    case EC.Polyline:
                        // 2 points * 2 bytes each
                        var points = reader.ReadPoints(command.Length / (sizeof(ushort) * 2));
                        picture.Polylines.Add(new(points));
                        break;
                    case EC.TextColor:
                        picture.TextColor = reader.ReadColour(picture);
                        break;
                    case EC.CharacterSetIndex:
                        picture.CharSetIndex = reader.ReadUInt16BE();
                        break;
                    case EC.AlternateCharacterSetIndex:
                        picture.AlternateCharSetIndex = reader.ReadUInt16BE();
                        break;
                    case EC.FillBundleIndex:
                        picture.FillBundleIndex = reader.ReadUInt16BE();
                        break;
                    case EC.InteriorStyle:
                        picture.InteriorStyle = (InteriorStyleType)reader.ReadUInt16BE();
                        break;
                    case EC.FillColor:
                        picture.FillColor = reader.ReadColour(picture);
                        break;
                    case EC.LineJoin:
                        picture.LineJoin = (LineJoinType)reader.ReadUInt16BE();
                        break;
                    case EC.BeginPictureBody:
                    case EC.BeginFigure:
                    case EC.EndFigure:
                    case EC.EndPicture:
                    case EC.BeginApplicationStructureBody:
                    case EC.EndApplicationStructure:
                        // TODO: Read part 1 of spec to find out what goes here
                        break;
                    case EC.EdgeType:
                        picture.EdgeType = (EdgeType)reader.ReadUInt16BE();
                        break;
                    case EC.EdgeWidth:
                        picture.EdgeWidth = reader.ReadUInt16BE();
                        break;
                    case EC.EdgeColor:
                        picture.EdgeColor = reader.ReadColour(picture);
                        break;
                    case EC.EdgeVisibility:
                        picture.EdgeVisibility = (EdgeVisibility)reader.ReadUInt16BE();
                        break;
                    case EC.EdgeJoin:
                        picture.EdgeJoin = (EdgeJoin)reader.ReadUInt16BE();
                        break;
                    case EC.CharacterOrientation:
                        picture.CharacterOrientation = new(
                            reader.ReadUInt16BE(), reader.ReadUInt16BE(),
                            reader.ReadUInt16BE(), reader.ReadUInt16BE());
                        break;
                    case EC.CharacterExpansionFactor:
                        picture.CharacterExpansionFactor = reader.ReadSingle();
                        break;
                    case EC.CharacterHeight:
                        picture.CharacterHeight = reader.ReadUInt16BE();
                        break;
                    case EC.Text:
                        var text = new Text(reader.ReadPoint(), (Finality)reader.ReadUInt16BE(), ReadString());
                        picture.Text.Add(text);
                        break;
                    case EC.ColorTable:
                        var startingIndex = ReadPrecision(metafile.ColorIndexPrecision);
                        picture.ColorTable = ReadColours(command.Length - ((int)metafile.ColorIndexPrecision / 8));
                        break;
                    case EC.ClipIndicator:
                        picture.ClipIndicator = reader.ReadUInt16BE() == 1;
                        break;
                    case EC.Transparency:
                        picture.Transparency = reader.ReadUInt16BE() == 1;
                        break;
                    case EC.RestrictedTextType:
                        // Handle
                        reader.ReadBytesRequired(command.Length);
                        break;
                    case EC.BeginApplicationStructure:
                        reader.ReadBytesRequired(command.Length);
                        break;
                    case EC.ApplicationStructureAttribute:
                        reader.ReadBytesRequired(command.Length);
                        break;
                    case EC.LineCap:
                        reader.ReadBytesRequired(command.Length);
                        break;
                    default:
                        _ = reader.ReadBytesRequired(command.Length);
                        break;
                }
            } while (command.Code != EC.EndPicture);

            return picture;
        }

        public string ReadString()
        {
            // Doesn't support long form strings (longer than 255 characters)
            var len = reader.ReadByte();
            var output = reader.ReadBytesRequired(len);
            return Encoding.UTF8.GetString(output);
        }

        public uint ReadPrecision(Precision p)
        {
            return p switch
            {
                Precision._8 => reader.ReadByte(),
                Precision._16 => reader.ReadUInt16(),
                Precision._24 => reader.ReadSWordBE(),
                Precision._32 => reader.ReadByte(),
                _ => throw new ArgumentOutOfRangeException(),
            };
        }

        public Colour[] ReadColours(int length)
        {
            var output = new List<Colour>();
            while (length > 0)
            {
                output.Add(reader.ReadDirectColour());
                length -= 3;
            }
            return output.ToArray();
        }

        public PointF ReadVdcPoint()
        {
            return metafile.VdcType switch
            {
                VDCType.Integer => new PointF(reader.ReadUInt16BE(), reader.ReadUInt16BE()),
                VDCType.Real => new PointF(reader.ReadSingle(), reader.ReadSingle()),
                _ => throw new ArgumentOutOfRangeException()
            };
        }

        public float ReadVdc()
        {
            return metafile.VdcType switch
            {
                VDCType.Integer => reader.ReadUInt16BE(),
                VDCType.Real => reader.ReadSingle(),
                _ => throw new ArgumentOutOfRangeException(),
            };
        }

        public float ReadSizeSpecification(SizeSpecMode spec)
        {
            return spec switch 
            { 
                SizeSpecMode.Absolute => ReadVdc(),
                _ => reader.ReadSingle()
            };
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

    public struct Point(ushort x, ushort y)
    {
        public ushort X = x;
        public ushort Y = y;

        public override string ToString()
        {
            return $"{{ X = {X}, Y = {Y} }}";
        }
    }

    public struct CharSet(CharSetType type, string designation)
    {
        public CharSetType Type = type;
        public string Designation = designation;
    }

    // This should also save the current color at the time of parsing
    public struct Polyline(Point[] points)
    {
        public Point[] Points = points;
    }

    public struct Colour(byte r, byte g, byte b)
    {
        public byte R = r;
        public byte G = g;
        public byte B = b;

        public override string ToString()
        {
            return $"{{ R = {R}, G = {G}, B = {B} }}";
        }
    }

    // VDC size based struct. ushort should be generic
    public struct Orientation(ushort xUp, ushort yUp, ushort xBase, ushort yBase)
    {
        public ushort XUp = xUp;
        public ushort YUp = yUp;
        public ushort XBase = xBase;
        public ushort YBase = yBase;
    }

    public struct Text(Point position, Finality finality, string content)
    {
        public Point Position = position;
        public Finality Finality = finality;
        public string Content = content;
    }

    public struct Picture(string name)
    {
        public string Name = name;
        public Colour BackgroundColour = new(255, 255, 255);
        public ColourSelectionMode ColorSelectionMode;
        public Colour[] ColorTable = [];
        public SizeSpecMode LineWidthMode;
        public SizeSpecMode MarkerSizeMode;
        public SizeSpecMode EdgeWidthMode;
        public PointF VdcBottomLeft = new(0, 0);
        // TODO: Check to see if this default value is based on metafile VDCType
        public PointF VdcTopRight = new(32767, 32767);
        public ScalingMode ScalingMode;
        public float MetricScalingFactor;
        public VdcIntPrecision VdcIntPrecision;
        public FPType VdcRealPrecision;
        public float MitreLimit;
        public float LineWidth;
        public Colour LineColor;
        public Colour TextColor;
        public Colour FillColor;
        public List<Polyline> Polylines = [];
        public ushort CharSetIndex;
        public EdgeType EdgeType;
        public ushort EdgeWidth;
        public Colour EdgeColor;
        public EdgeVisibility EdgeVisibility;
        public EdgeJoin EdgeJoin;
        public Orientation CharacterOrientation;
        public ushort AlternateCharSetIndex;
        public ushort FillBundleIndex;
        public InteriorStyleType InteriorStyle;
        public LineJoinType LineJoin;
        public float CharacterExpansionFactor;
        public ushort CharacterHeight;
        public bool ClipIndicator;
        public bool Transparency;
        public List<Text> Text = [];
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
            var selector = output.Select((x, i) => (i + 1) % 4 == 0 && i != output.Length - 1 ? x + "_" : x.ToString());
            return string.Join("", selector);
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
                throw new EndOfStreamException(string.Format("{0} bytes required from stream, but only {1} returned.",
                    byteCount, result.Length));

            return result;
        }

        public static uint ReadSWordBE(this BinaryReader reader)
        {
            var bytes = reader.ReadBytesRequired(3);
            return (uint)((bytes[0] << 16) | (bytes[1] << 8) | bytes[2]);
        }

        public static Command ReadCommand(this BinaryReader reader)
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
                if (command.Partitioned) throw new InvalidDataException("Partition detected");
            }

            return command;
        }

        public static Point ReadPoint(this BinaryReader reader)
        {
            var point = new Point(
                reader.ReadUInt16BE(),
                reader.ReadUInt16BE()
            );
            return point;
        }

        public static Point[] ReadPoints(this BinaryReader reader, int len)
        {
            var points = new Point[len];
            for (var i = 0; i < len; i++)
                points[i] = new(
                    reader.ReadUInt16BE(),
                    reader.ReadUInt16BE()
                );

            return points;
        }

        public static Colour ReadColour(this BinaryReader reader, Picture picture)
        {
            if (picture.ColorSelectionMode == ColourSelectionMode.Direct)
            {
                return new(
                    reader.ReadByte(),
                    reader.ReadByte(),
                    reader.ReadByte()
                );
            } else
            {
                return picture.ColorTable[reader.ReadByte()];
            }
        }
        public static Colour ReadDirectColour(this BinaryReader reader)
        {
            return new(
                reader.ReadByte(),
                reader.ReadByte(),
                reader.ReadByte()
            );
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

        public static Color ToColor(this Colour c)
        {
            return Color.FromArgb(c.R, c.G, c.B);
        }

        public static PointF ToPointF(this Point p)
        {
            return new PointF(p.X, p.Y);
        }
    }
}
