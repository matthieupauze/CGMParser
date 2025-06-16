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

    public enum VdcIntPrecision
    {
        _16 = 16,
        _24 = 24,
        _32 = 32,
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

    public enum FPType
    {
        _32BitFloat,
        _64BitFloat,
        _32BitFix,
        _64BitFix
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
        BeginFigure = 0x00A0,
        EndFigure = 0x0100,
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

        LineBundleIndex = 0x5020,
    }
}
