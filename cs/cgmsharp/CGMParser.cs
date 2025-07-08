using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;

namespace cgmsharp;

public class CGMParser
{
    private BinaryReader reader = null!;

    // Spec says we should always have 1 picture
    private Metafile metafile;
    private Picture picture;

    public Metafile ParseCGM(Stream dataStream)
    {
        var mReader = new MemoryStream();
        dataStream.CopyTo(mReader);
        mReader.Position = 0;
        reader = new(mReader);
        metafile = new();

        while (reader.BaseStream.Position != reader.BaseStream.Length)
        {
            var command = ReadCommand();

            switch (command.Code)
            {
                case EC.BeginMetafile:
                    metafile.FileName = ReadString();
                    break;
                case EC.VDCType:
                    metafile.VdcType = (VDCType)ReadE();
                    break;
                case EC.IntegerPrecision:
                    metafile.IntPrecision = (Precision)ReadInt();
                    break;
                case EC.RealPrecision:
                    metafile.RealPrecision = ReadPrecision();
                    break;
                case EC.IndexPrecision:
                    metafile.IndexPrecision = (Precision)ReadInt();
                    break;
                case EC.ColorIndexPrecision:
                    metafile.ColorIndexPrecision = (Precision)ReadInt();
                    break;
                case EC.ColourPrecision:
                    metafile.ColorPrecision = (Precision)ReadInt();
                    break;
                case EC.MetafileVersion:
                    metafile.MetafileVersion = (FileVersion)ReadInt();
                    break;
                case EC.MetafileDescription:
                    if (metafile.MetafileDescription == string.Empty)
                    {
                        metafile.MetafileDescription = ReadString();
                    }
                    else
                    {
                        metafile.MetafileDescription += ReadString();
                    }

                    break;
                case EC.MaxColorIndex:
                    metafile.MaxColorIndex = ReadIndex(metafile.ColorIndexPrecision);
                    break;
                case EC.ColorModel:
                    metafile.ColorModel = (ColorModel)ReadIndex();
                    break;
                case EC.ColorValueExtent:
                    if (metafile.ColorModel == ColorModel.RGB || metafile.ColorModel == ColorModel.CMYK)
                    {
                        // TODO: Save these somewhere
                        var minC = ReadDirectColour();
                        var maxC = ReadDirectColour();
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
                        len -= reader.PeekByte() + 1;
                        metafile.Fonts.Add(ReadString());
                    }

                    break;
                case EC.CharacterSetList:
                    len = command.Length;
                    while (len != 0)
                    {
                        var type = (CharSetType)ReadE();
                        len -= 2;
                        var stringLength = reader.PeekByte() + 1;
                        var designation = ReadString();
                        len -= stringLength;
                        metafile.CharSets.Add(new(type, designation));
                    }

                    break;

                case EC.MetafileElementList:
                    var elCount = ReadInt();
                    metafile.DrawingSet = new DrawingSet[elCount];
                    for (var i = 0; i < elCount; i++)
                    {
                        _ = ReadIndex();
                        metafile.DrawingSet[i] = (DrawingSet)ReadIndex();
                    }

                    break;
                case EC.CharacterCodingAnnouncer:
                    metafile.Announcer = (CharacterCodingAnnouncer)ReadE();
                    break;
                case EC.BeginPicture:
                    metafile.Picture = ParsePicture();
                    break;
                case EC.MaximumVDCExtent:
                    metafile.MaximumVdcExtentBottomLeft = ReadPoint();
                    metafile.MaximumVdcExtentTopRight = ReadPoint();
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

    private Picture ParsePicture()
    {
        picture = new(ReadString());
        Command command;
        do
        {
            command = ReadCommand();
            switch (command.Code)
            {
                case EC.BackgroundColor:
                    picture.BackgroundColour = ReadDirectColour();
                    break;
                case EC.ColorSelectionMode:
                    picture.ColorSelectionMode = (ColourSelectionMode)ReadE();
                    break;
                case EC.LineWidthSpecMode:
                    picture.LineWidthMode = (SizeSpecMode)ReadE();
                    break;
                case EC.MarkerSizeSpecMode:
                    picture.MarkerSizeMode = (SizeSpecMode)ReadE();
                    break;
                case EC.EdgeWidthSpecMode:
                    picture.EdgeWidthMode = (SizeSpecMode)ReadE();
                    break;
                case EC.VdcExtent:
                    picture.VdcBottomLeft = ReadPoint();
                    picture.VdcTopRight = ReadPoint();
                    break;
                case EC.ScalingMode:
                    picture.ScalingMode = (ScalingMode)ReadE();
                    if (picture.ScalingMode == ScalingMode.Metric)
                    {
                        picture.MetricScalingFactor = ReadReal();
                    }
                    else
                    {
                        Debug.Assert(command.Length == 6, "Scaling Factor supplied with abstract scaling mode");
                    }

                    break;
                case EC.VdcIntegerPrecision:
                    picture.VdcIntPrecision = (VdcIntPrecision)ReadInt();
                    break;
                case EC.VdcRealPrecision:
                    picture.VdcRealPrecision = ReadPrecision();
                    break;
                case EC.MitreLimit:
                    picture.MitreLimit = ReadReal();
                    break;
                case EC.LineWidth:
                    if (picture.LineWidthMode == SizeSpecMode.Absolute)
                    {
                        picture.LineWidth = ReadVdc();
                    }
                    else
                    {
                        throw new NotImplementedException("Line Width Mode other than absolute not implemented");
                    }

                    break;
                case EC.LineColor:
                    picture.LineColor = ReadColour(command);
                    break;
                case EC.Polyline:
                    var points = ReadPoints(command.Length);
                    picture.Polylines.Add(new(points));
                    break;
                case EC.TextColor:
                    picture.TextColor = ReadColour(command);
                    break;
                case EC.CharacterSetIndex:
                    picture.CharSetIndex = ReadIndex();
                    break;
                case EC.AlternateCharacterSetIndex:
                    picture.AlternateCharSetIndex = ReadIndex();
                    break;
                case EC.FillBundleIndex:
                    picture.FillBundleIndex = ReadIndex();
                    break;
                case EC.InteriorStyle:
                    picture.InteriorStyle = (InteriorStyleType)ReadE();
                    break;
                case EC.FillColor:
                    picture.FillColor = ReadColour(command);
                    break;
                case EC.LineJoin:
                    picture.LineJoin = (LineJoinType)ReadIndex();
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
                    picture.EdgeType = (EdgeType)ReadIndex();
                    break;
                case EC.EdgeWidth:
                    if (picture.EdgeWidthMode == SizeSpecMode.Absolute)
                    {
                        picture.EdgeWidth = ReadVdc();
                    }
                    else
                    {
                        throw new NotImplementedException("Edge Width Mode other than absolute not implemented");
                    }

                    break;
                case EC.EdgeColor:
                    picture.EdgeColor = ReadColour(command);
                    break;
                case EC.EdgeVisibility:
                    picture.EdgeVisibility = (EdgeVisibility)ReadE();
                    break;
                case EC.EdgeJoin:
                    picture.EdgeJoin = (EdgeJoin)ReadIndex();
                    break;
                case EC.CharacterOrientation:
                    picture.CharacterOrientation = new(ReadVdc(), ReadVdc(), ReadVdc(), ReadVdc());
                    break;
                case EC.CharacterExpansionFactor:
                    picture.CharacterExpansionFactor = reader.ReadSingleBE();
                    break;
                case EC.CharacterHeight:
                    picture.CharacterHeight = ReadVdc();
                    break;
                case EC.Text:
                    var text = new Text(ReadPoint(), (Finality)ReadE(), ReadString());
                    picture.Text.Add(text);
                    break;
                case EC.ColorTable:
                    var startingIndex = ReadIndex(metafile.ColorIndexPrecision);
                    picture.ColorTable = ReadColours(command.Length - (int)metafile.ColorIndexPrecision / 8);
                    break;
                case EC.ClipIndicator:
                    picture.ClipIndicator = ReadE() == 1;
                    break;
                case EC.Transparency:
                    picture.Transparency = ReadE() == 1;
                    break;
                case EC.RestrictedTextType:
                    picture.RestrictedTextType = (RestrictedTextType)ReadIndex();
                    break;
                case EC.BeginApplicationStructure:
                    picture.Structures.Add(ReadApplicationStructure());
                    break;
                case EC.ApplicationStructureAttribute:
                    picture.StructureAttributes.Add(ReadApplicationStructureAttribute(command.Length));
                    break;
                case EC.LineCap:
                    picture.LineCap = new()
                    {
                        LineIndicator = (LineCapIndicator)ReadIndex(),
                        DashIndicator = (DashCapIndicator)ReadIndex(),
                    };
                    break;
                case EC.LineType:
                    picture.LineType = (LineType)ReadIndex();
                    break;
                case EC.Ellipse:
                    picture.Ellipses.Add(new(ReadPoint(), ReadPoint(), ReadPoint()));
                    break;
                case EC.RestrictedText:
                    picture.RestrictedTexts.Add(new(ReadVdc(), ReadVdc(), ReadPoint(), (Finality)ReadE(),
                        ReadString()));
                    break;
                case EC.NoOp:
                    Debug.Assert(false, "Bytes should have been skipped in ReadCommand()");
                    break;
                case EC.BeginMetafile:
                    var title = ReadString();
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
        var len = reader.ReadByte();
        Debug.Assert(len < 255, "Doesn't support long form strings (> 255 characters)");
        var output = reader.ReadBytesRequired(len);
        return Encoding.UTF8.GetString(output);
    }

    public int ReadIndex(Precision? p = null)
    {
        p ??= metafile.IndexPrecision;
        return p switch
        {
            Precision._8 => reader.ReadSByte(),
            Precision._16 => reader.ReadInt16BE(),
            Precision._24 => reader.ReadInt24BE(),
            Precision._32 => reader.ReadInt32BE(),
            _ => throw new ArgumentOutOfRangeException(),
        };
    }

    public int ReadE()
    {
        return reader.ReadInt16BE();
    }

    public byte VdcWidth()
    {
        return metafile.VdcType switch
        {
            VDCType.Integer => (byte)((byte)picture.VdcIntPrecision / 8),
            VDCType.Real => picture.VdcRealPrecision switch
            {
                FloatingPrecision._32BitFloat or FloatingPrecision._32BitFix => 4,
                FloatingPrecision._64BitFloat or FloatingPrecision._64BitFix => 8,
                _ => throw new ArgumentOutOfRangeException(),
            },
            _ => throw new ArgumentOutOfRangeException(),
        };
    }

    public int ReadInt()
    {
        return metafile.IntPrecision switch
        {
            Precision._8 => reader.ReadSByte(),
            Precision._16 => reader.ReadInt16BE(),
            Precision._24 => reader.ReadInt24BE(),
            Precision._32 => reader.ReadInt32BE(),
            _ => throw new NotImplementedException(),
        };
    }

    public double ReadReal(FloatingPrecision? p = null)
    {
        p ??= metafile.RealPrecision;
        return p switch
        {
            FloatingPrecision._32BitFloat => reader.ReadSingleBE(),
            FloatingPrecision._64BitFloat => reader.ReadDoubleBE(),
            FloatingPrecision._32BitFix => reader.ReadSingleFixed(),
            FloatingPrecision._64BitFix => reader.ReadDoubleFixed(),
            _ => throw new NotImplementedException(),
        };
    }

    public double ReadVdc()
    {
        return metafile.VdcType switch
        {
            VDCType.Integer => picture.VdcIntPrecision switch
            {
                VdcIntPrecision._16 => reader.ReadInt16BE(),
                VdcIntPrecision._24 => reader.ReadInt24BE(),
                VdcIntPrecision._32 => reader.ReadInt32BE(),
                _ => throw new ArgumentOutOfRangeException(),
            },
            VDCType.Real => ReadReal(picture.VdcRealPrecision),
            _ => throw new ArgumentOutOfRangeException(),
        };
    }

    public Point ReadPoint()
    {
        var point = new Point(
            ReadVdc(),
            ReadVdc()
        );
        return point;
    }

    public Point[] ReadPoints(int cmdLength)
    {
        var len = cmdLength / (VdcWidth() * 2);
        var points = new Point[len];
        for (var i = 0; i < len; i++)
        {
            points[i] = ReadPoint();
        }

        return points;
    }

    public Colour ReadColour(Command cmd)
    {
        if (picture.ColorSelectionMode == ColourSelectionMode.Direct)
        {
            return ReadDirectColour();
        }

        return picture.ColorTable[reader.ReadByte()];
    }

    public Colour ReadDirectColour()
    {
        return new(
            reader.ReadByte(),
            reader.ReadByte(),
            reader.ReadByte()
        );
    }

    public Colour[] ReadColours(int length)
    {
        var output = new List<Colour>();
        while (length > 0)
        {
            output.Add(ReadDirectColour());
            length -= 3;
        }

        return output.ToArray();
    }

    public FloatingPrecision ReadPrecision()
    {
        var fpOrFixed = (PrecisionChoice)ReadE();
        var wholeWidth = ReadInt();
        var fieldWidth = ReadInt();
        if (fpOrFixed == PrecisionChoice.Floating)
        {
            return wholeWidth == 9 ? FloatingPrecision._32BitFloat : FloatingPrecision._64BitFloat;
        }

        return wholeWidth == 16 ? FloatingPrecision._32BitFix : FloatingPrecision._64BitFix;
    }

    public ApplicationStructureAttribute ReadApplicationStructureAttribute(int length)
    {
        var stringLen = reader.PeekByte();
        length -= stringLen;
        var output = new ApplicationStructureAttribute()
        {
            Type = ReadString(),
            // IDK the format for this. Just going to read the extra bytes from the command as scrap
            DataRecord = { },
        };
        var _scrap = reader.ReadBytesRequired(length);

        return output;
    }

    public ApplicationStructure ReadApplicationStructure()
    {
        return new()
        {
            Identifier = ReadString(),
            Type = ReadString(),
            Inheritance = (InheritanceFlag)reader.ReadUInt16BE(),
        };
    }

    public Command ReadCommand()
    {
        // Commands are padded to start on words
        if (reader.BaseStream.Position % 2 != 0)
        {
            reader.ReadByte();
        }

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

public struct Point(double x, double y)
{
    public double X = x;
    public double Y = y;

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

public struct Ellipse(Point center, Point firstConjugate, Point secondConjugate)
{
    private Point Center = center;
    private Point FirstConjugate = firstConjugate;
    private Point SecondConjugate = secondConjugate;
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

public struct Orientation(double xUp, double yUp, double xBase, double yBase)
{
    public double XUp = xUp;
    public double YUp = yUp;
    public double XBase = xBase;
    public double YBase = yBase;
}

public struct RestrictedText(double width, double height, Point position, Finality finality, string content)
{
    private double Width = width;
    private double Height = height;
    private Point Position = position;
    private Finality Finality = finality;
    private string Content = content;
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
    public ColourSelectionMode ColorSelectionMode = ColourSelectionMode.Direct;
    public Colour[] ColorTable = [];
    public SizeSpecMode LineWidthMode;
    public SizeSpecMode MarkerSizeMode;
    public SizeSpecMode EdgeWidthMode;

    public Point VdcBottomLeft = new(0, 0);
    public Point VdcTopRight = new(32767, 32767);

    public ScalingMode ScalingMode;
    public double MetricScalingFactor;

    public VdcIntPrecision VdcIntPrecision = VdcIntPrecision._16;
    public FloatingPrecision VdcRealPrecision = FloatingPrecision._32BitFix;

    public double MitreLimit;

    public double LineWidth;
    public Colour LineColor;
    public LineCap LineCap;
    public LineType LineType;
    public LineJoinType LineJoin;

    public Colour TextColor;
    public Colour FillColor;

    public int CharSetIndex;
    public int AlternateCharSetIndex;

    public EdgeType EdgeType;
    public double EdgeWidth;
    public Colour EdgeColor;
    public EdgeVisibility EdgeVisibility;
    public EdgeJoin EdgeJoin;

    public Orientation CharacterOrientation;
    public int FillBundleIndex;
    public InteriorStyleType InteriorStyle;
    public float CharacterExpansionFactor;
    public double CharacterHeight;
    public bool ClipIndicator;
    public bool Transparency;
    public RestrictedTextType RestrictedTextType;

    public List<Ellipse> Ellipses = [];
    public List<Polyline> Polylines = [];
    public List<Text> Text = [];
    public List<RestrictedText> RestrictedTexts = [];
    public List<ApplicationStructure> Structures = [];
    public List<ApplicationStructureAttribute> StructureAttributes = [];
}

public struct LineCap
{
    public LineCapIndicator LineIndicator;
    public DashCapIndicator DashIndicator;
}

public struct ApplicationStructureAttribute
{
    public string Type;
    public byte[] DataRecord;
}

public struct ApplicationStructure
{
    public string Identifier;
    public string Type;
    public InheritanceFlag Inheritance;
}

public struct Metafile()
{
    public string FileName = string.Empty;
    public string MetafileDescription = string.Empty;
    public FileVersion MetafileVersion;
    public DrawingSet[] DrawingSet = [];
    public Picture Picture;

    public Point MaximumVdcExtentBottomLeft;
    public Point MaximumVdcExtentTopRight;

    public CharacterCodingAnnouncer Announcer;

    public VDCType VdcType = VDCType.Integer;
    public Precision IntPrecision = Precision._16;
    public FloatingPrecision RealPrecision = FloatingPrecision._32BitFix;
    public Precision IndexPrecision = Precision._16;
    public Precision ColorIndexPrecision = Precision._8;
    public Precision ColorPrecision = Precision._8;
    public int MaxColorIndex = 63;

    public ColorModel ColorModel = ColorModel.RGB;
    public int ColorValueExtent = 0;
    public Precision NamePrecision = Precision._16;

    public List<string> Fonts = [];
    public List<CharSet> CharSets = [];
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
        return (ushort)((b[0] << 8) | b[1]);
    }

    public static short ReadInt16BE(this BinaryReader reader)
    {
        var b = reader.ReadBytesRequired(2);
        return (short)((b[0] << 8) | b[1]);
    }

    public static uint ReadUInt24BE(this BinaryReader reader)
    {
        var bytes = reader.ReadBytesRequired(3);
        return (uint)((bytes[0] << 16) | (bytes[1] << 8) | bytes[2]);
    }

    public static int ReadInt24BE(this BinaryReader reader)
    {
        var bytes = reader.ReadBytesRequired(3);
        return (bytes[0] << 16) | (bytes[1] << 8) | bytes[2];
    }

    public static uint ReadUInt32BE(this BinaryReader reader)
    {
        var b = reader.ReadBytesRequired(4);
        return (uint)((b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3]);
    }

    public static int ReadInt32BE(this BinaryReader reader)
    {
        var b = reader.ReadBytesRequired(4);
        return (b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3];
    }

    public static unsafe float ReadSingleBE(this BinaryReader reader)
    {
        var b = reader.ReadBytesRequired(4);
        var temp = (uint)((b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3]);
        return *(float*)&temp;
    }

    public static unsafe double ReadDoubleBE(this BinaryReader reader)
    {
        var b = reader.ReadBytesRequired(8);
        var hi = (uint)((b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3]);
        var lo = (uint)((b[4] << 24) | (b[5] << 16) | (b[6] << 8) | b[7]);

        var temp = ((ulong)hi << 32) | lo;
        return *(double*)&temp;
    }

    public static double ReadSingleFixed(this BinaryReader reader)
    {
        var whole = reader.ReadInt16BE();
        var fraction = reader.ReadUInt16BE();
        return whole + fraction / 0x8000;
    }

    public static double ReadDoubleFixed(this BinaryReader reader)
    {
        var whole = reader.ReadInt32BE();
        var fraction = reader.ReadUInt32BE();
        return whole + fraction / 0x8000_0000;
    }

    public static byte PeekByte(this BinaryReader reader)
    {
        var oldLocation = reader.BaseStream.Position;
        var output = reader.ReadByte();
        reader.BaseStream.Position = oldLocation;
        return output;
    }

    public static byte[] ReadBytesRequired(this BinaryReader reader, int byteCount)
    {
        var result = reader.ReadBytes(byteCount);

        if (result.Length != byteCount)
        {
            throw new EndOfStreamException(string.Format("{0} bytes required from stream, but only {1} returned.",
                byteCount, result.Length));
        }

        return result;
    }

    public static Color ToColor(this Colour c)
    {
        return Color.FromArgb(c.R, c.G, c.B);
    }

    public static PointF ToPointF(this Point p)
    {
        return new((float)p.X, (float)p.Y);
    }
}