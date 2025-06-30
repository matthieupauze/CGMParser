namespace cgmsharp
{
    public enum FileVersion
    {
        v1 = 1,
        v2,
        v3,
        v4
    }
    public enum VDCType
    {
        Integer = 0,
        Real = 1
    }

    public enum EdgeType
    {
        Solid = 1,
        Dash,
        Dot,
        DashDot,
        DashDotDot,
    }

    public enum LineType
    {
        Solid = 1,
        Dash,
        Dot,
        DashDot,
        DashDotDot,
        Reserved
    }

    public enum LineCapIndicator
    {
        Unspecified = 1,
        Butt,
        Round,
        ProjectingSquare,
        Triangle,
        Reserved,
    }

    public enum DashCapIndicator
    {
        Unspecified = 1,
        Butt,
        Match,
        Reserved,
    }

    public enum Finality
    {
        NotFinal,
        Final,
    }

    public enum EdgeVisibility
    {
        Off,
        On,
    }

    public enum EdgeJoin
    {
        Unspecified = 1,
        Mitre,
        Round,
        Bevel,
    }

    public enum DrawingSet
    {
        Base,
        PlusControl,
        Version2,
        ExtendedPrimitives,
        Version2Gksm,
        Version3,
        Version4,
    }

    public enum InteriorStyleType
    {
        Hollow,
        Solid,
        Pattern,
        Hatch,
        Empty,
        GeometricPattern,
        Interpolated,
    }

    public enum LineJoinType
    {
        Unspecified,
        Mitre,
        Round,
        Bevel,
    }

    public enum VdcIntPrecision
    {
        _16 = 16,
        _24 = 24,
        _32 = 32,
    }

    public enum Precision
    {
        _8 = 8,
        _16 = 16,
        _24 = 24,
        _32 = 32,
    }

    public enum CharacterCodingAnnouncer
    {
        Basic7,
        Basic8,
        Extended7,
        Extended8,
    }

    public enum RestrictedTextType
    {
        Basic = 1,
        BoxedCap,
        BoxedAll,
        IsotropicCap,
        IsotropicAll,
        Justified,
        Reserved
    }

    public enum InheritanceFlag
    {
        StateList,
        ApplicationStructure,
    }

    public enum ColourSelectionMode
    {
        Indexed,
        Direct,
    }

    public enum ScalingMode
    {
        Abstract,
        Metric,
    }

    public enum SizeSpecMode
    {
        Absolute,
        Scaled,
        Fractional,
        Mm,
    }

    public enum CharSetType
    {
        _94CharGSet,
        _96CharGSet,
        _94CharMultibyteGSet,
        _96CharMultibyteGSet,
        CompleteCode,
    }

    public enum ColorModel
    {
        RGB = 1,
        CIELAB,
        CIELUV,
        CMYK,
        RGBRelated
    }

    public enum PrecisionChoice
    {
        Floating = 0,
        Fixed = 1,
    }

    public enum FloatingPrecision
    {
        _32BitFloat,
        _64BitFloat,
        _32BitFix,
        _64BitFix,
    }

    public enum Class
    {
        Delimiter = 0,
        MetaDescriptor,
        PictureDescriptor,
        Control,
        Graphical,
        Attribute,
        Escape,
        External,
        Segment,
        AppStructure
    }

    public enum EC
    {
        NoOp = 0,
        BeginMetafile = 0x0020,
        EndMetafile = 0x0040,
        BeginPicture = 0x0060,
        BeginPictureBody = 0x0080,
        EndPicture = 0x00A0,
        BeginSegment = 0x00C0,
        EndSegment = 0x00E0,
        BeginFigure = 0x0100,
        EndFigure = 0x0120,
        BeginProtectionRegion = 0x01A0,
        EndProtectionRegion = 0x01C0,
        BeginCompoundLine = 0x01E0,
        EndCompoundLine = 0x0200,
        BeginCompoundTextPath = 0x0220,
        EndCompoundTextPath = 0x0240,
        BeginTileArray = 0x0260,
        EndTileArray = 0x0280,
        BeginApplicationStructure = 0x02A0,
        BeginApplicationStructureBody = 0x02C0,
        EndApplicationStructure = 0x02E0,

        MetafileVersion = 0x1020,
        MetafileDescription = 0x1040,
        VDCType = 0x1060,
        IntegerPrecision = 0x1080,
        RealPrecision = 0x10A0,
        IndexPrecision = 0x10C0,
        ColourPrecision = 0x10E0,
        ColorIndexPrecision = 0x1100,
        MaxColorIndex = 0x1120,
        ColorValueExtent = 0x1140,
        MetafileElementList = 0x1160,
        MetafileDefaultsReplacement = 0x1180,
        FontList = 0x11A0,
        CharacterSetList = 0x11C0,
        CharacterCodingAnnouncer = 0x11E0,
        NamePrecision = 0x1200,
        MaximumVDCExtent = 0x1220,
        SegmentPriorityExtent = 0x1240,
        ColorModel = 0x1260,
        ColorCalibration = 0x1280,
        FontProperties = 0x12A0,
        GlyphMapping = 0x12C0,
        SymbolLibraryList = 0x12E0,
        PictureDirectory = 0x1300,

        ScalingMode = 0x2020,
        ColorSelectionMode = 0x2040,
        LineWidthSpecMode = 0x2060,
        MarkerSizeSpecMode = 0x2080,
        EdgeWidthSpecMode = 0x20A0,
        VdcExtent = 0x20C0,
        BackgroundColor = 0x20E0,
        DeviceViewport = 0x2100,
        DeviceViewportSpecMode = 0x2120,
        DeviceViewportMapping = 0x2140,
        LineRepresentation = 0x2160,
        MarkerRepresentation = 0x2180,
        TextRepresentation = 0x21A0,
        FillRepresentation = 0x21C0,
        EdgeRepresentation = 0x21E0,
        InteriorStyleSpecMode = 0x2200,
        LineAndEdgeTypeDefinition = 0x2220,
        HatchStyleDefinition = 0x2240,
        GeometricPatternDefinition = 0x2260,
        ApplicationStructureDirectory = 0x2280,

        VdcIntegerPrecision = 0x3020,
        VdcRealPrecision = 0x3040,
        AuxiliaryColor = 0x3060,
        Transparency = 0x3080,
        ClipRectangle = 0x30A0,
        ClipIndicator = 0x30C0,
        LineClippingMode = 0x30E0,
        MarkerClippingMode = 0x3100,
        EdgeClippingMode = 0x3120,
        NewRegion = 0x3140,
        SavePrimitiveContext = 0x3160,
        RestorePrimitiveContext = 0x3180,
        ProtectionRegionIndicator = 0x3220,
        GeneralizedTextPathMode = 0x3240,
        MitreLimit = 0x3260,
        TransparentCellColor = 0x3280,

        Polyline = 0x4020,
        DisjointPolyline = 0x4040,
        Polymarker = 0x4060,
        Text = 0x4080,
        RestrictedText = 0x40A0,
        AppendText = 0x40C0,
        Polygon = 0x40E0,
        PolygonSet = 0x4100,
        CellArray = 0x4120,
        GeneralizedDrawingPrimitive = 0x4140,
        Rectangle = 0x4160,
        Circle = 0x4180,
        CircularArc3Point = 0x41A0,
        CircularArc3PointClose = 0x41C0,
        CircularArcCenter = 0x41E0,
        CircularArcCenterClose = 0x4200,
        Ellipse = 0x4220,
        EllipticalArc = 0x4240,
        EllipticalArcClose = 0x4260,
        CircularArcCenterReversed = 0x4280,
        ConnectingEdge = 0x42A0,
        HyperbolicArc = 0x42C0,
        ParabolicArc = 0x42E0,
        NonUniformBSpline = 0x4300,
        NonUniformRationalBSpline = 0x4320,
        PolyBezier = 0x4340,
        PolySymbol = 0x4360,
        BitonalTile = 0x4380,
        Tile = 0x43A0,

        LineBundleIndex = 0x5020,
        LineType = 0x5040,
        LineWidth = 0x5060,
        LineColor = 0x5080,
        MarkerBundleIndex = 0x50A0,
        MarkerType = 0x50C0,
        MarkerSize = 0x50E0,
        MarkerColor = 0x5100,
        TextBundleIndex = 0x5120,
        TextFontIndex = 0x5140,
        TextPrecision = 0x5160,
        CharacterExpansionFactor = 0x5180,
        CharacterSpacing = 0x51A0,
        TextColor = 0x51C0,
        CharacterHeight = 0x51E0,
        CharacterOrientation = 0x5200,
        TextPath = 0x5220,
        TextAlignment = 0x5240,
        CharacterSetIndex = 0x5260,
        AlternateCharacterSetIndex = 0x5280,
        FillBundleIndex = 0x52A0,
        InteriorStyle = 0x52C0,
        FillColor = 0x52E0,
        HatchIndex = 0x5300,
        PatternIndex = 0x5320,
        EdgeBundleIndex = 0x5340,
        EdgeType = 0x5360,
        EdgeWidth = 0x5380,
        EdgeColor = 0x53A0,
        EdgeVisibility = 0x53C0,
        FillReferencePoint = 0x53E0,
        PatternTable = 0x5400,
        PatternSize = 0x5420,
        ColorTable = 0x5440,
        AspectSourceFlags = 0x5460,
        PickIdentifier = 0x5480,
        LineCap = 0x54A0,
        LineJoin = 0x54C0,
        LineTypeContinuation = 0x54E0,
        LineTypeInitialOffset = 0x5500,
        TextScoreType = 0x55A0,
        RestrictedTextType = 0x5540,
        InterpolatedInterior = 0x5560,
        EdgeCap = 0x5580,
        EdgeJoin = 0x55A0,
        EdgeTypeContinuation = 0x55C0,
        EdgeTypeInitialOffset = 0x55E0,
        SymbolLibraryIndex = 0x5600,
        SymbolColor = 0x5620,
        SymbolSize = 0x5640,
        SymbolOrientation = 0x5660,

        Escape = 0x6020,

        Message = 0x7020,
        ApplicationData = 0x7040,

        CopySegment = 0x8020,
        InheritanceFilter = 0x8040,
        ClipInheritance = 0x8060,
        SegmentTransformation = 0x8080,
        SegmentHighlighting = 0x80A0,
        SegmentDisplayPriority = 0x80C0,
        SegmentPickPriority = 0x80E0,

        ApplicationStructureAttribute = 0x9020
    }
}
