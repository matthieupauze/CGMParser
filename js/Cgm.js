// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Cgm = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
/**
 * Nothing here for now
 */

var Cgm = (function() {
  Cgm.ColourSelectionMode = Object.freeze({
    INDEXED: 0,
    DIRECT: 1,

    0: "INDEXED",
    1: "DIRECT",
  });

  Cgm.Vdc = Object.freeze({
    INTEGER: 0,
    REAL: 1,

    0: "INTEGER",
    1: "REAL",
  });

  Cgm.CharSetType = Object.freeze({
    C_94_CHAR_G_SET: 0,
    C_96_CHAR_G_SET: 1,
    C_94_CHAR_MULTIBYTE_G_SET: 2,
    C_96_CHAR_MULTIBYTE_G_SET: 3,
    COMPLETE_CODE: 4,

    0: "C_94_CHAR_G_SET",
    1: "C_96_CHAR_G_SET",
    2: "C_94_CHAR_MULTIBYTE_G_SET",
    3: "C_96_CHAR_MULTIBYTE_G_SET",
    4: "COMPLETE_CODE",
  });

  Cgm.ChunkType = Object.freeze({
    NO_OP: 0,
    BEGIN_METAFILE: 32,
    END_METAFILE: 64,
    BEGIN_PICTURE: 96,
    BEGIN_PICTURE_BODY: 128,
    END_PICTURE: 160,
    BEGIN_SEGMENT: 192,
    END_SEGMENT: 224,
    BEGIN_FIGURE: 256,
    END_FIGURE: 288,
    BEGIN_PROTECTION_REGION: 416,
    END_PROTECTION_REGION: 448,
    BEGIN_COMPOUND_LINE: 480,
    END_COMPOUND_LINE: 512,
    BEGIN_COMPOUND_TEXT_PATH: 544,
    END_COMPOUND_TEXT_PATH: 576,
    BEGIN_TILE_ARRAY: 608,
    END_TILE_ARRAY: 640,
    BEGIN_APPLICATION_STRUCTURE: 672,
    BEGIN_APPLICATION_STRUCTURE_BODY: 704,
    END_APPLICATION_STRUCTURE: 736,
    METAFILE_VERSION: 4128,
    METAFILE_DESCRIPTION: 4160,
    VDC_TYPE: 4192,
    INTEGER_PRECISION: 4224,
    REAL_PRECISION: 4256,
    INDEX_PRECISION: 4288,
    COLOUR_PRECISION: 4320,
    COLOR_INDEX_PRECISION: 4352,
    MAX_COLOR_INDEX: 4384,
    COLOR_VALUE_EXTENT: 4416,
    METAFILE_ELEMENT_LIST: 4448,
    METAFILE_DEFAULTS_REPLACEMENT: 4480,
    FONT_LIST: 4512,
    CHARACTER_SET_LIST: 4544,
    CHARACTER_CODING_ANNOUNCER: 4576,
    NAME_PRECISION: 4608,
    MAXIMUM_VDC_EXTENT: 4640,
    SEGMENT_PRIORITY_EXTENT: 4672,
    COLOR_MODEL: 4704,
    COLOR_CALIBRATION: 4736,
    FONT_PROPERTIES: 4768,
    GLYPH_MAPPING: 4800,
    SYMBOL_LIBRARY_LIST: 4832,
    PICTURE_DIRECTORY: 4864,
    SCALING_MODE: 8224,
    COLOR_SELECTION_MODE: 8256,
    LINE_WIDTH_SPEC_MODE: 8288,
    MARKER_SIZE_SPEC_MODE: 8320,
    EDGE_WIDTH_SPEC_MODE: 8352,
    VDC_EXTENT: 8384,
    BACKGROUND_COLOR: 8416,
    DEVICE_VIEWPORT: 8448,
    DEVICE_VIEWPORT_SPEC_MODE: 8480,
    DEVICE_VIEWPORT_MAPPING: 8512,
    LINE_REPRESENTATION: 8544,
    MARKER_REPRESENTATION: 8576,
    TEXT_REPRESENTATION: 8608,
    FILL_REPRESENTATION: 8640,
    EDGE_REPRESENTATION: 8672,
    INTERIOR_STYLE_SPEC_MODE: 8704,
    LINE_AND_EDGE_TYPE_DEFINITION: 8736,
    HATCH_STYLE_DEFINITION: 8768,
    GEOMETRIC_PATTERN_DEFINITION: 8800,
    APPLICATION_STRUCTURE_DIRECTORY: 8832,
    VDC_INTEGER_PRECISION: 12320,
    VDC_REAL_PRECISION: 12352,
    AUXILIARY_COLOR: 12384,
    TRANSPARENCY: 12416,
    CLIP_RECTANGLE: 12448,
    CLIP_INDICATOR: 12480,
    LINE_CLIPPING_MODE: 12512,
    MARKER_CLIPPING_MODE: 12544,
    EDGE_CLIPPING_MODE: 12576,
    NEW_REGION: 12608,
    SAVE_PRIMITIVE_CONTEXT: 12640,
    RESTORE_PRIMITIVE_CONTEXT: 12672,
    PROTECTION_REGION_INDICATOR: 12832,
    GENERALIZED_TEXT_PATH_MODE: 12864,
    MITRE_LIMIT: 12896,
    TRANSPARENT_CELL_COLOR: 12928,
    POLYLINE: 16416,
    DISJOINT_POLYLINE: 16448,
    POLYMARKER: 16480,
    TEXT: 16512,
    RESTRICTED_TEXT: 16544,
    APPEND_TEXT: 16576,
    POLYGON: 16608,
    POLYGON_SET: 16640,
    CELL_ARRAY: 16672,
    GENERALIZED_DRAWING_PRIMITIVE: 16704,
    RECTANGLE: 16736,
    CIRCLE: 16768,
    CIRCULAR_ARC3_POINT: 16800,
    CIRCULAR_ARC3_POINT_CLOSE: 16832,
    CIRCULAR_ARC_CENTER: 16864,
    CIRCULAR_ARC_CENTER_CLOSE: 16896,
    ELLIPSE: 16928,
    ELLIPTICAL_ARC: 16960,
    ELLIPTICAL_ARC_CLOSE: 16992,
    CIRCULAR_ARC_CENTER_REVERSED: 17024,
    CONNECTING_EDGE: 17056,
    HYPERBOLIC_ARC: 17088,
    PARABOLIC_ARC: 17120,
    NON_UNIFORM_B_SPLINE: 17152,
    NON_UNIFORM_RATIONAL_B_SPLINE: 17184,
    POLY_BEZIER: 17216,
    POLY_SYMBOL: 17248,
    BITONAL_TILE: 17280,
    TILE: 17312,
    LINE_BUNDLE_INDEX: 20512,
    LINE_TYPE: 20544,
    LINE_WIDTH: 20576,
    LINE_COLOR: 20608,
    MARKER_BUNDLE_INDEX: 20640,
    MARKER_TYPE: 20672,
    MARKER_SIZE: 20704,
    MARKER_COLOR: 20736,
    TEXT_BUNDLE_INDEX: 20768,
    TEXT_FONT_INDEX: 20800,
    TEXT_PRECISION: 20832,
    CHARACTER_EXPANSION_FACTOR: 20864,
    CHARACTER_SPACING: 20896,
    TEXT_COLOR: 20928,
    CHARACTER_HEIGHT: 20960,
    CHARACTER_ORIENTATION: 20992,
    TEXT_PATH: 21024,
    TEXT_ALIGNMENT: 21056,
    CHARACTER_SET_INDEX: 21088,
    ALTERNATE_CHARACTER_SET_INDEX: 21120,
    FILL_BUNDLE_INDEX: 21152,
    INTERIOR_STYLE: 21184,
    FILL_COLOR: 21216,
    HATCH_INDEX: 21248,
    PATTERN_INDEX: 21280,
    EDGE_BUNDLE_INDEX: 21312,
    EDGE_TYPE: 21344,
    EDGE_WIDTH: 21376,
    EDGE_COLOR: 21408,
    EDGE_VISIBILITY: 21440,
    FILL_REFERENCE_POINT: 21472,
    PATTERN_TABLE: 21504,
    PATTERN_SIZE: 21536,
    COLOR_TABLE: 21568,
    ASPECT_SOURCE_FLAGS: 21600,
    PICK_IDENTIFIER: 21632,
    LINE_CAP: 21664,
    LINE_JOIN: 21696,
    LINE_TYPE_CONTINUATION: 21728,
    LINE_TYPE_INITIAL_OFFSET: 21760,
    TEXT_SCORE_TYPE: 21792,
    RESTRICTED_TEXT_TYPE: 21824,
    INTERPOLATED_INTERIOR: 21856,
    EDGE_CAP: 21888,
    EDGE_JOIN: 21920,
    EDGE_TYPE_CONTINUATION: 21952,
    EDGE_TYPE_INITIAL_OFFSET: 21984,
    SYMBOL_LIBRARY_INDEX: 22016,
    SYMBOL_COLOR: 22048,
    SYMBOL_SIZE: 22080,
    SYMBOL_ORIENTATION: 22112,
    ESCAPE: 24608,
    MESSAGE: 28704,
    APPLICATION_DATA: 28736,
    COPY_SEGMENT: 32800,
    INHERITANCE_FILTER: 32832,
    CLIP_INHERITANCE: 32864,
    SEGMENT_TRANSFORMATION: 32896,
    SEGMENT_HIGHLIGHTING: 32928,
    SEGMENT_DISPLAY_PRIORITY: 32960,
    SEGMENT_PICK_PRIORITY: 32992,
    APPLICATION_STRUCTURE_ATTRIBUTE: 36896,

    0: "NO_OP",
    32: "BEGIN_METAFILE",
    64: "END_METAFILE",
    96: "BEGIN_PICTURE",
    128: "BEGIN_PICTURE_BODY",
    160: "END_PICTURE",
    192: "BEGIN_SEGMENT",
    224: "END_SEGMENT",
    256: "BEGIN_FIGURE",
    288: "END_FIGURE",
    416: "BEGIN_PROTECTION_REGION",
    448: "END_PROTECTION_REGION",
    480: "BEGIN_COMPOUND_LINE",
    512: "END_COMPOUND_LINE",
    544: "BEGIN_COMPOUND_TEXT_PATH",
    576: "END_COMPOUND_TEXT_PATH",
    608: "BEGIN_TILE_ARRAY",
    640: "END_TILE_ARRAY",
    672: "BEGIN_APPLICATION_STRUCTURE",
    704: "BEGIN_APPLICATION_STRUCTURE_BODY",
    736: "END_APPLICATION_STRUCTURE",
    4128: "METAFILE_VERSION",
    4160: "METAFILE_DESCRIPTION",
    4192: "VDC_TYPE",
    4224: "INTEGER_PRECISION",
    4256: "REAL_PRECISION",
    4288: "INDEX_PRECISION",
    4320: "COLOUR_PRECISION",
    4352: "COLOR_INDEX_PRECISION",
    4384: "MAX_COLOR_INDEX",
    4416: "COLOR_VALUE_EXTENT",
    4448: "METAFILE_ELEMENT_LIST",
    4480: "METAFILE_DEFAULTS_REPLACEMENT",
    4512: "FONT_LIST",
    4544: "CHARACTER_SET_LIST",
    4576: "CHARACTER_CODING_ANNOUNCER",
    4608: "NAME_PRECISION",
    4640: "MAXIMUM_VDC_EXTENT",
    4672: "SEGMENT_PRIORITY_EXTENT",
    4704: "COLOR_MODEL",
    4736: "COLOR_CALIBRATION",
    4768: "FONT_PROPERTIES",
    4800: "GLYPH_MAPPING",
    4832: "SYMBOL_LIBRARY_LIST",
    4864: "PICTURE_DIRECTORY",
    8224: "SCALING_MODE",
    8256: "COLOR_SELECTION_MODE",
    8288: "LINE_WIDTH_SPEC_MODE",
    8320: "MARKER_SIZE_SPEC_MODE",
    8352: "EDGE_WIDTH_SPEC_MODE",
    8384: "VDC_EXTENT",
    8416: "BACKGROUND_COLOR",
    8448: "DEVICE_VIEWPORT",
    8480: "DEVICE_VIEWPORT_SPEC_MODE",
    8512: "DEVICE_VIEWPORT_MAPPING",
    8544: "LINE_REPRESENTATION",
    8576: "MARKER_REPRESENTATION",
    8608: "TEXT_REPRESENTATION",
    8640: "FILL_REPRESENTATION",
    8672: "EDGE_REPRESENTATION",
    8704: "INTERIOR_STYLE_SPEC_MODE",
    8736: "LINE_AND_EDGE_TYPE_DEFINITION",
    8768: "HATCH_STYLE_DEFINITION",
    8800: "GEOMETRIC_PATTERN_DEFINITION",
    8832: "APPLICATION_STRUCTURE_DIRECTORY",
    12320: "VDC_INTEGER_PRECISION",
    12352: "VDC_REAL_PRECISION",
    12384: "AUXILIARY_COLOR",
    12416: "TRANSPARENCY",
    12448: "CLIP_RECTANGLE",
    12480: "CLIP_INDICATOR",
    12512: "LINE_CLIPPING_MODE",
    12544: "MARKER_CLIPPING_MODE",
    12576: "EDGE_CLIPPING_MODE",
    12608: "NEW_REGION",
    12640: "SAVE_PRIMITIVE_CONTEXT",
    12672: "RESTORE_PRIMITIVE_CONTEXT",
    12832: "PROTECTION_REGION_INDICATOR",
    12864: "GENERALIZED_TEXT_PATH_MODE",
    12896: "MITRE_LIMIT",
    12928: "TRANSPARENT_CELL_COLOR",
    16416: "POLYLINE",
    16448: "DISJOINT_POLYLINE",
    16480: "POLYMARKER",
    16512: "TEXT",
    16544: "RESTRICTED_TEXT",
    16576: "APPEND_TEXT",
    16608: "POLYGON",
    16640: "POLYGON_SET",
    16672: "CELL_ARRAY",
    16704: "GENERALIZED_DRAWING_PRIMITIVE",
    16736: "RECTANGLE",
    16768: "CIRCLE",
    16800: "CIRCULAR_ARC3_POINT",
    16832: "CIRCULAR_ARC3_POINT_CLOSE",
    16864: "CIRCULAR_ARC_CENTER",
    16896: "CIRCULAR_ARC_CENTER_CLOSE",
    16928: "ELLIPSE",
    16960: "ELLIPTICAL_ARC",
    16992: "ELLIPTICAL_ARC_CLOSE",
    17024: "CIRCULAR_ARC_CENTER_REVERSED",
    17056: "CONNECTING_EDGE",
    17088: "HYPERBOLIC_ARC",
    17120: "PARABOLIC_ARC",
    17152: "NON_UNIFORM_B_SPLINE",
    17184: "NON_UNIFORM_RATIONAL_B_SPLINE",
    17216: "POLY_BEZIER",
    17248: "POLY_SYMBOL",
    17280: "BITONAL_TILE",
    17312: "TILE",
    20512: "LINE_BUNDLE_INDEX",
    20544: "LINE_TYPE",
    20576: "LINE_WIDTH",
    20608: "LINE_COLOR",
    20640: "MARKER_BUNDLE_INDEX",
    20672: "MARKER_TYPE",
    20704: "MARKER_SIZE",
    20736: "MARKER_COLOR",
    20768: "TEXT_BUNDLE_INDEX",
    20800: "TEXT_FONT_INDEX",
    20832: "TEXT_PRECISION",
    20864: "CHARACTER_EXPANSION_FACTOR",
    20896: "CHARACTER_SPACING",
    20928: "TEXT_COLOR",
    20960: "CHARACTER_HEIGHT",
    20992: "CHARACTER_ORIENTATION",
    21024: "TEXT_PATH",
    21056: "TEXT_ALIGNMENT",
    21088: "CHARACTER_SET_INDEX",
    21120: "ALTERNATE_CHARACTER_SET_INDEX",
    21152: "FILL_BUNDLE_INDEX",
    21184: "INTERIOR_STYLE",
    21216: "FILL_COLOR",
    21248: "HATCH_INDEX",
    21280: "PATTERN_INDEX",
    21312: "EDGE_BUNDLE_INDEX",
    21344: "EDGE_TYPE",
    21376: "EDGE_WIDTH",
    21408: "EDGE_COLOR",
    21440: "EDGE_VISIBILITY",
    21472: "FILL_REFERENCE_POINT",
    21504: "PATTERN_TABLE",
    21536: "PATTERN_SIZE",
    21568: "COLOR_TABLE",
    21600: "ASPECT_SOURCE_FLAGS",
    21632: "PICK_IDENTIFIER",
    21664: "LINE_CAP",
    21696: "LINE_JOIN",
    21728: "LINE_TYPE_CONTINUATION",
    21760: "LINE_TYPE_INITIAL_OFFSET",
    21792: "TEXT_SCORE_TYPE",
    21824: "RESTRICTED_TEXT_TYPE",
    21856: "INTERPOLATED_INTERIOR",
    21888: "EDGE_CAP",
    21920: "EDGE_JOIN",
    21952: "EDGE_TYPE_CONTINUATION",
    21984: "EDGE_TYPE_INITIAL_OFFSET",
    22016: "SYMBOL_LIBRARY_INDEX",
    22048: "SYMBOL_COLOR",
    22080: "SYMBOL_SIZE",
    22112: "SYMBOL_ORIENTATION",
    24608: "ESCAPE",
    28704: "MESSAGE",
    28736: "APPLICATION_DATA",
    32800: "COPY_SEGMENT",
    32832: "INHERITANCE_FILTER",
    32864: "CLIP_INHERITANCE",
    32896: "SEGMENT_TRANSFORMATION",
    32928: "SEGMENT_HIGHLIGHTING",
    32960: "SEGMENT_DISPLAY_PRIORITY",
    32992: "SEGMENT_PICK_PRIORITY",
    36896: "APPLICATION_STRUCTURE_ATTRIBUTE",
  });

  function Cgm(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Cgm.prototype._read = function() {
    this.chunks = [];
    var i = 0;
    do {
      var _ = new Chunk(this._io, this, this._root);
      this.chunks.push(_);
      i++;
    } while (!(this._io.isEof()));
  }

  var BeginApplicationStructure = Cgm.BeginApplicationStructure = (function() {
    function BeginApplicationStructure(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BeginApplicationStructure.prototype._read = function() {
    }

    return BeginApplicationStructure;
  })();

  var HatchStyleDefinition = Cgm.HatchStyleDefinition = (function() {
    function HatchStyleDefinition(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HatchStyleDefinition.prototype._read = function() {
    }

    return HatchStyleDefinition;
  })();

  var CharacterExpansionFactor = Cgm.CharacterExpansionFactor = (function() {
    function CharacterExpansionFactor(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CharacterExpansionFactor.prototype._read = function() {
    }

    return CharacterExpansionFactor;
  })();

  var HatchIndex = Cgm.HatchIndex = (function() {
    function HatchIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HatchIndex.prototype._read = function() {
    }

    return HatchIndex;
  })();

  var SavePrimitiveContext = Cgm.SavePrimitiveContext = (function() {
    function SavePrimitiveContext(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SavePrimitiveContext.prototype._read = function() {
    }

    return SavePrimitiveContext;
  })();

  var BeginTileArray = Cgm.BeginTileArray = (function() {
    function BeginTileArray(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BeginTileArray.prototype._read = function() {
    }

    return BeginTileArray;
  })();

  var SymbolLibraryList = Cgm.SymbolLibraryList = (function() {
    function SymbolLibraryList(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SymbolLibraryList.prototype._read = function() {
    }

    return SymbolLibraryList;
  })();

  var ApplicationStructureAttribute = Cgm.ApplicationStructureAttribute = (function() {
    function ApplicationStructureAttribute(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ApplicationStructureAttribute.prototype._read = function() {
    }

    return ApplicationStructureAttribute;
  })();

  var SymbolLibraryIndex = Cgm.SymbolLibraryIndex = (function() {
    function SymbolLibraryIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SymbolLibraryIndex.prototype._read = function() {
    }

    return SymbolLibraryIndex;
  })();

  var DeviceViewportMapping = Cgm.DeviceViewportMapping = (function() {
    function DeviceViewportMapping(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    DeviceViewportMapping.prototype._read = function() {
    }

    return DeviceViewportMapping;
  })();

  var NonUniformBSpline = Cgm.NonUniformBSpline = (function() {
    function NonUniformBSpline(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    NonUniformBSpline.prototype._read = function() {
    }

    return NonUniformBSpline;
  })();

  var Chunk = Cgm.Chunk = (function() {
    function Chunk(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Chunk.prototype._read = function() {
      this.cmd = new Command(this._io, this, this._root);
      switch (this.cmd.type) {
      case Cgm.ChunkType.BEGIN_APPLICATION_STRUCTURE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BeginApplicationStructure(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.HATCH_STYLE_DEFINITION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new HatchStyleDefinition(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.TEXT_PRECISION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new TextPrecision(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.INTERIOR_STYLE_SPEC_MODE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new InteriorStyleSpecMode(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.PROTECTION_REGION_INDICATOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ProtectionRegionIndicator(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.VDC_INTEGER_PRECISION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new VdcIntegerPrecision(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.TEXT_COLOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new TextColor(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.POLYMARKER:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new Polymarker(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.LINE_AND_EDGE_TYPE_DEFINITION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new LineAndEdgeTypeDefinition(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CHARACTER_SET_LIST:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CharacterSetList(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.NON_UNIFORM_B_SPLINE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new NonUniformBSpline(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.END_METAFILE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EndMetafile(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.LINE_BUNDLE_INDEX:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new LineBundleIndex(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.END_PICTURE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EndPicture(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.APPEND_TEXT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new AppendText(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.FONT_LIST:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new FontList(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.NAME_PRECISION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new NamePrecision(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.EDGE_TYPE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EdgeType(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.SAVE_PRIMITIVE_CONTEXT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SavePrimitiveContext(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.POLYLINE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new Polyline(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.NON_UNIFORM_RATIONAL_B_SPLINE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new NonUniformRationalBSpline(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.SYMBOL_SIZE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SymbolSize(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CHARACTER_SPACING:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CharacterSpacing(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.BITONAL_TILE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BitonalTile(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CHARACTER_SET_INDEX:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CharacterSetIndex(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CIRCULAR_ARC_CENTER_CLOSE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CircularArcCenterClose(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.LINE_TYPE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new LineType(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.INTEGER_PRECISION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new IntegerPrecision(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.LINE_WIDTH_SPEC_MODE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new LineWidthSpecMode(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.LINE_CAP:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new LineCap(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.POLYGON_SET:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new PolygonSet(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.DEVICE_VIEWPORT_SPEC_MODE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new DeviceViewportSpecMode(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.APPLICATION_DATA:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ApplicationData(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.BEGIN_PROTECTION_REGION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BeginProtectionRegion(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.PATTERN_SIZE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new PatternSize(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.VDC_EXTENT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new VdcExtent(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.EDGE_WIDTH:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EdgeWidth(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.LINE_CLIPPING_MODE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new LineClippingMode(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.END_TILE_ARRAY:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EndTileArray(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.REAL_PRECISION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new RealPrecision(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CELL_ARRAY:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CellArray(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.LINE_TYPE_CONTINUATION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new LineTypeContinuation(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.SYMBOL_LIBRARY_LIST:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SymbolLibraryList(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.EDGE_COLOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EdgeColor(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.MARKER_REPRESENTATION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MarkerRepresentation(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.RESTORE_PRIMITIVE_CONTEXT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new RestorePrimitiveContext(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.FILL_BUNDLE_INDEX:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new FillBundleIndex(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.ELLIPTICAL_ARC:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EllipticalArc(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CIRCULAR_ARC_CENTER:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CircularArcCenter(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.COLOR_CALIBRATION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ColorCalibration(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.ALTERNATE_CHARACTER_SET_INDEX:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new AlternateCharacterSetIndex(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.MAXIMUM_VDC_EXTENT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MaximumVdcExtent(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.EDGE_VISIBILITY:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EdgeVisibility(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CIRCLE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new Circle(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.ASPECT_SOURCE_FLAGS:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new AspectSourceFlags(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.HYPERBOLIC_ARC:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new HyperbolicArc(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.BEGIN_METAFILE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BeginMetafile(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.METAFILE_VERSION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MetafileVersion(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.MARKER_CLIPPING_MODE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MarkerClippingMode(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CLIP_INHERITANCE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ClipInheritance(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.INDEX_PRECISION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new IndexPrecision(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.SCALING_MODE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ScalingMode(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.EDGE_TYPE_INITIAL_OFFSET:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EdgeTypeInitialOffset(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.SEGMENT_HIGHLIGHTING:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SegmentHighlighting(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.GENERALIZED_TEXT_PATH_MODE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new GeneralizedTextPathMode(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.COLOR_MODEL:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ColorModel(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.TEXT_PATH:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new TextPath(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.END_COMPOUND_LINE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EndCompoundLine(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.BEGIN_FIGURE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BeginFigure(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.COLOR_INDEX_PRECISION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ColorIndexPrecision(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.POLY_SYMBOL:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new PolySymbol(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.SYMBOL_COLOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SymbolColor(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.BEGIN_COMPOUND_TEXT_PATH:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BeginCompoundTextPath(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.TILE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new Tile(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.EDGE_CAP:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EdgeCap(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.FILL_REPRESENTATION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new FillRepresentation(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.TRANSPARENCY:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new Transparency(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.EDGE_TYPE_CONTINUATION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EdgeTypeContinuation(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CHARACTER_CODING_ANNOUNCER:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CharacterCodingAnnouncer(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.FONT_PROPERTIES:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new FontProperties(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.RESTRICTED_TEXT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new RestrictedText(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CHARACTER_HEIGHT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CharacterHeight(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CLIP_RECTANGLE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ClipRectangle(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.DEVICE_VIEWPORT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new DeviceViewport(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.FILL_COLOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new FillColor(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.TEXT_FONT_INDEX:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new TextFontIndex(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.EDGE_REPRESENTATION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EdgeRepresentation(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.TEXT_ALIGNMENT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new TextAlignment(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.COLOR_TABLE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ColorTable(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.LINE_JOIN:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new LineJoin(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CLIP_INDICATOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ClipIndicator(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.BEGIN_PICTURE_BODY:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BeginPictureBody(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.END_COMPOUND_TEXT_PATH:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EndCompoundTextPath(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CIRCULAR_ARC3_POINT_CLOSE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CircularArc3PointClose(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.NEW_REGION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new NewRegion(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.BEGIN_SEGMENT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BeginSegment(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.RESTRICTED_TEXT_TYPE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new RestrictedTextType(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.VDC_REAL_PRECISION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new VdcRealPrecision(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.COPY_SEGMENT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CopySegment(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.LINE_WIDTH:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new LineWidth(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.GENERALIZED_DRAWING_PRIMITIVE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new GeneralizedDrawingPrimitive(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.MARKER_COLOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MarkerColor(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.EDGE_BUNDLE_INDEX:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EdgeBundleIndex(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.COLOR_VALUE_EXTENT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ColorValueExtent(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CHARACTER_ORIENTATION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CharacterOrientation(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.GEOMETRIC_PATTERN_DEFINITION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new GeometricPatternDefinition(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.VDC_TYPE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new VdcType(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.END_PROTECTION_REGION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EndProtectionRegion(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.TEXT_BUNDLE_INDEX:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new TextBundleIndex(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.POLY_BEZIER:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new PolyBezier(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.ELLIPSE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new Ellipse(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.INTERPOLATED_INTERIOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new InterpolatedInterior(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.MESSAGE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new Message(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.AUXILIARY_COLOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new AuxiliaryColor(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.BEGIN_APPLICATION_STRUCTURE_BODY:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BeginApplicationStructureBody(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.POLYGON:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new Polygon(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CONNECTING_EDGE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ConnectingEdge(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.SEGMENT_PICK_PRIORITY:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SegmentPickPriority(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.GLYPH_MAPPING:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new GlyphMapping(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.MARKER_SIZE_SPEC_MODE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MarkerSizeSpecMode(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.BEGIN_PICTURE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BeginPicture(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.ESCAPE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new Escape(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.DEVICE_VIEWPORT_MAPPING:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new DeviceViewportMapping(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.BACKGROUND_COLOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BackgroundColor(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.PARABOLIC_ARC:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ParabolicArc(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.INHERITANCE_FILTER:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new InheritanceFilter(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.COLOR_SELECTION_MODE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ColorSelectionMode(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.SEGMENT_DISPLAY_PRIORITY:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SegmentDisplayPriority(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.NO_OP:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new NoOp(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.SYMBOL_LIBRARY_INDEX:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SymbolLibraryIndex(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.SEGMENT_PRIORITY_EXTENT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SegmentPriorityExtent(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.TEXT_REPRESENTATION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new TextRepresentation(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CIRCULAR_ARC3_POINT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CircularArc3Point(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.INTERIOR_STYLE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new InteriorStyle(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.COLOUR_PRECISION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ColourPrecision(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.END_APPLICATION_STRUCTURE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EndApplicationStructure(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.RECTANGLE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new Rectangle(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.MARKER_BUNDLE_INDEX:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MarkerBundleIndex(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.END_SEGMENT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EndSegment(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.TEXT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new Text(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.EDGE_JOIN:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EdgeJoin(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.PICK_IDENTIFIER:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new PickIdentifier(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.PATTERN_INDEX:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new PatternIndex(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.APPLICATION_STRUCTURE_DIRECTORY:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ApplicationStructureDirectory(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CIRCULAR_ARC_CENTER_REVERSED:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CircularArcCenterReversed(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.MARKER_TYPE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MarkerType(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.FILL_REFERENCE_POINT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new FillReferencePoint(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.MARKER_SIZE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MarkerSize(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.LINE_COLOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new LineColor(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.METAFILE_DESCRIPTION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MetafileDescription(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.SEGMENT_TRANSFORMATION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SegmentTransformation(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.CHARACTER_EXPANSION_FACTOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new CharacterExpansionFactor(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.HATCH_INDEX:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new HatchIndex(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.SYMBOL_ORIENTATION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new SymbolOrientation(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.LINE_TYPE_INITIAL_OFFSET:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new LineTypeInitialOffset(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.MITRE_LIMIT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MitreLimit(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.METAFILE_ELEMENT_LIST:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MetafileElementList(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.TEXT_SCORE_TYPE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new TextScoreType(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.MAX_COLOR_INDEX:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MaxColorIndex(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.LINE_REPRESENTATION:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new LineRepresentation(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.DISJOINT_POLYLINE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new DisjointPolyline(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.BEGIN_COMPOUND_LINE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BeginCompoundLine(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.APPLICATION_STRUCTURE_ATTRIBUTE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new ApplicationStructureAttribute(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.METAFILE_DEFAULTS_REPLACEMENT:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new MetafileDefaultsReplacement(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.EDGE_WIDTH_SPEC_MODE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EdgeWidthSpecMode(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.TRANSPARENT_CELL_COLOR:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new TransparentCellColor(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.BEGIN_TILE_ARRAY:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new BeginTileArray(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.PICTURE_DIRECTORY:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new PictureDirectory(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.ELLIPTICAL_ARC_CLOSE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EllipticalArcClose(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.END_FIGURE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EndFigure(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.PATTERN_TABLE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new PatternTable(_io__raw_body, this, this._root);
        break;
      case Cgm.ChunkType.EDGE_CLIPPING_MODE:
        this._raw_body = this._io.readBytes(this.cmd.len);
        var _io__raw_body = new KaitaiStream(this._raw_body);
        this.body = new EdgeClippingMode(_io__raw_body, this, this._root);
        break;
      default:
        this.body = this._io.readBytes(this.cmd.len);
        break;
      }
    }

    return Chunk;
  })();

  var Name = Cgm.Name = (function() {
    function Name(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Name.prototype._read = function() {
      this.nameId = new Si(this._io, this, this._root, this._root.namePrecision);
    }

    return Name;
  })();

  var InterpolatedInterior = Cgm.InterpolatedInterior = (function() {
    function InterpolatedInterior(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    InterpolatedInterior.prototype._read = function() {
    }

    return InterpolatedInterior;
  })();

  var AuxiliaryColor = Cgm.AuxiliaryColor = (function() {
    function AuxiliaryColor(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    AuxiliaryColor.prototype._read = function() {
    }

    return AuxiliaryColor;
  })();

  var MarkerType = Cgm.MarkerType = (function() {
    function MarkerType(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MarkerType.prototype._read = function() {
    }

    return MarkerType;
  })();

  var ColorCalibration = Cgm.ColorCalibration = (function() {
    function ColorCalibration(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ColorCalibration.prototype._read = function() {
    }

    return ColorCalibration;
  })();

  var BeginPictureBody = Cgm.BeginPictureBody = (function() {
    function BeginPictureBody(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BeginPictureBody.prototype._read = function() {
    }

    return BeginPictureBody;
  })();

  var EllipticalArcClose = Cgm.EllipticalArcClose = (function() {
    function EllipticalArcClose(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EllipticalArcClose.prototype._read = function() {
    }

    return EllipticalArcClose;
  })();

  var RestrictedTextType = Cgm.RestrictedTextType = (function() {
    function RestrictedTextType(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    RestrictedTextType.prototype._read = function() {
    }

    return RestrictedTextType;
  })();

  var Point = Cgm.Point = (function() {
    function Point(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Point.prototype._read = function() {
      this.x = this._io.readU2be();
      this.y = this._io.readU2be();
    }

    return Point;
  })();

  var EndPicture = Cgm.EndPicture = (function() {
    function EndPicture(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EndPicture.prototype._read = function() {
    }

    return EndPicture;
  })();

  var EdgeWidthSpecMode = Cgm.EdgeWidthSpecMode = (function() {
    function EdgeWidthSpecMode(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EdgeWidthSpecMode.prototype._read = function() {
    }

    return EdgeWidthSpecMode;
  })();

  var MetafileDefaultsReplacement = Cgm.MetafileDefaultsReplacement = (function() {
    function MetafileDefaultsReplacement(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MetafileDefaultsReplacement.prototype._read = function() {
    }

    return MetafileDefaultsReplacement;
  })();

  var StrWithLen = Cgm.StrWithLen = (function() {
    function StrWithLen(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    StrWithLen.prototype._read = function() {
      this.len = this._io.readU1();
      this.value = KaitaiStream.bytesToStr(this._io.readBytes(this.len), "UTF-8");
    }

    return StrWithLen;
  })();

  var CharacterSetList = Cgm.CharacterSetList = (function() {
    function CharacterSetList(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CharacterSetList.prototype._read = function() {
      this.charSets = [];
      var i = 0;
      while (!this._io.isEof()) {
        this.charSets.push(new CharSet(this._io, this, this._root));
        i++;
      }
    }

    return CharacterSetList;
  })();

  var LineWidthSpecMode = Cgm.LineWidthSpecMode = (function() {
    function LineWidthSpecMode(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LineWidthSpecMode.prototype._read = function() {
    }

    return LineWidthSpecMode;
  })();

  var EndProtectionRegion = Cgm.EndProtectionRegion = (function() {
    function EndProtectionRegion(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EndProtectionRegion.prototype._read = function() {
    }

    return EndProtectionRegion;
  })();

  var Polygon = Cgm.Polygon = (function() {
    function Polygon(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Polygon.prototype._read = function() {
    }

    return Polygon;
  })();

  var LineWidth = Cgm.LineWidth = (function() {
    function LineWidth(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LineWidth.prototype._read = function() {
    }

    return LineWidth;
  })();

  var MetafileDescription = Cgm.MetafileDescription = (function() {
    function MetafileDescription(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MetafileDescription.prototype._read = function() {
      this.description = new StrWithLen(this._io, this, this._root);
    }

    return MetafileDescription;
  })();

  var EdgeTypeContinuation = Cgm.EdgeTypeContinuation = (function() {
    function EdgeTypeContinuation(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EdgeTypeContinuation.prototype._read = function() {
    }

    return EdgeTypeContinuation;
  })();

  var Circle = Cgm.Circle = (function() {
    function Circle(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Circle.prototype._read = function() {
    }

    return Circle;
  })();

  var ApplicationData = Cgm.ApplicationData = (function() {
    function ApplicationData(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ApplicationData.prototype._read = function() {
    }

    return ApplicationData;
  })();

  var MarkerSize = Cgm.MarkerSize = (function() {
    function MarkerSize(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MarkerSize.prototype._read = function() {
    }

    return MarkerSize;
  })();

  var SymbolOrientation = Cgm.SymbolOrientation = (function() {
    function SymbolOrientation(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SymbolOrientation.prototype._read = function() {
    }

    return SymbolOrientation;
  })();

  var VdcRealPrecision = Cgm.VdcRealPrecision = (function() {
    function VdcRealPrecision(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    VdcRealPrecision.prototype._read = function() {
    }

    return VdcRealPrecision;
  })();

  var TextAlignment = Cgm.TextAlignment = (function() {
    function TextAlignment(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TextAlignment.prototype._read = function() {
    }

    return TextAlignment;
  })();

  var CharacterSpacing = Cgm.CharacterSpacing = (function() {
    function CharacterSpacing(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CharacterSpacing.prototype._read = function() {
    }

    return CharacterSpacing;
  })();

  var Polyline = Cgm.Polyline = (function() {
    function Polyline(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Polyline.prototype._read = function() {
      this.points = [];
      var i = 0;
      while (!this._io.isEof()) {
        this.points.push(new Point(this._io, this, this._root));
        i++;
      }
    }

    return Polyline;
  })();

  var TextPath = Cgm.TextPath = (function() {
    function TextPath(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TextPath.prototype._read = function() {
    }

    return TextPath;
  })();

  var Si = Cgm.Si = (function() {
    function Si(_io, _parent, _root, len) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this.len = len;

      this._read();
    }
    Si.prototype._read = function() {
      switch (this.len) {
      case 8:
        this.value = this._io.readS1();
        break;
      case 16:
        this.value = this._io.readS2be();
        break;
      case 32:
        this.value = this._io.readS4be();
        break;
      }
    }

    return Si;
  })();

  var SegmentPriorityExtent = Cgm.SegmentPriorityExtent = (function() {
    function SegmentPriorityExtent(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SegmentPriorityExtent.prototype._read = function() {
    }

    return SegmentPriorityExtent;
  })();

  var ColorSelectionMode = Cgm.ColorSelectionMode = (function() {
    function ColorSelectionMode(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ColorSelectionMode.prototype._read = function() {
      this.value = this._io.readU2be();
    }

    return ColorSelectionMode;
  })();

  var CopySegment = Cgm.CopySegment = (function() {
    function CopySegment(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CopySegment.prototype._read = function() {
    }

    return CopySegment;
  })();

  var FontList = Cgm.FontList = (function() {
    function FontList(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FontList.prototype._read = function() {
      this.fonts = [];
      var i = 0;
      while (!this._io.isEof()) {
        this.fonts.push(new StrWithLen(this._io, this, this._root));
        i++;
      }
    }

    return FontList;
  })();

  var FontProperties = Cgm.FontProperties = (function() {
    function FontProperties(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FontProperties.prototype._read = function() {
    }

    return FontProperties;
  })();

  var PolySymbol = Cgm.PolySymbol = (function() {
    function PolySymbol(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PolySymbol.prototype._read = function() {
    }

    return PolySymbol;
  })();

  var FillRepresentation = Cgm.FillRepresentation = (function() {
    function FillRepresentation(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FillRepresentation.prototype._read = function() {
    }

    return FillRepresentation;
  })();

  var FillReferencePoint = Cgm.FillReferencePoint = (function() {
    function FillReferencePoint(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FillReferencePoint.prototype._read = function() {
    }

    return FillReferencePoint;
  })();

  var ColorModel = Cgm.ColorModel = (function() {
    function ColorModel(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ColorModel.prototype._read = function() {
    }

    return ColorModel;
  })();

  var DirectColourValue = Cgm.DirectColourValue = (function() {
    function DirectColourValue(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    DirectColourValue.prototype._read = function() {
      this.r = this._io.readU1();
      this.g = this._io.readU1();
      this.b = this._io.readU1();
    }

    return DirectColourValue;
  })();

  var CellArray = Cgm.CellArray = (function() {
    function CellArray(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CellArray.prototype._read = function() {
    }

    return CellArray;
  })();

  var SegmentPickPriority = Cgm.SegmentPickPriority = (function() {
    function SegmentPickPriority(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SegmentPickPriority.prototype._read = function() {
    }

    return SegmentPickPriority;
  })();

  var EdgeClippingMode = Cgm.EdgeClippingMode = (function() {
    function EdgeClippingMode(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EdgeClippingMode.prototype._read = function() {
    }

    return EdgeClippingMode;
  })();

  var CircularArc3Point = Cgm.CircularArc3Point = (function() {
    function CircularArc3Point(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CircularArc3Point.prototype._read = function() {
    }

    return CircularArc3Point;
  })();

  var EndApplicationStructure = Cgm.EndApplicationStructure = (function() {
    function EndApplicationStructure(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EndApplicationStructure.prototype._read = function() {
    }

    return EndApplicationStructure;
  })();

  var RestorePrimitiveContext = Cgm.RestorePrimitiveContext = (function() {
    function RestorePrimitiveContext(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    RestorePrimitiveContext.prototype._read = function() {
    }

    return RestorePrimitiveContext;
  })();

  var MaxColorIndex = Cgm.MaxColorIndex = (function() {
    function MaxColorIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MaxColorIndex.prototype._read = function() {
      this.value = new ColorIndex(this._io, this, this._root);
    }

    return MaxColorIndex;
  })();

  var CircularArc3PointClose = Cgm.CircularArc3PointClose = (function() {
    function CircularArc3PointClose(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CircularArc3PointClose.prototype._read = function() {
    }

    return CircularArc3PointClose;
  })();

  var BeginCompoundLine = Cgm.BeginCompoundLine = (function() {
    function BeginCompoundLine(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BeginCompoundLine.prototype._read = function() {
    }

    return BeginCompoundLine;
  })();

  var AspectSourceFlags = Cgm.AspectSourceFlags = (function() {
    function AspectSourceFlags(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    AspectSourceFlags.prototype._read = function() {
    }

    return AspectSourceFlags;
  })();

  var BeginCompoundTextPath = Cgm.BeginCompoundTextPath = (function() {
    function BeginCompoundTextPath(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BeginCompoundTextPath.prototype._read = function() {
    }

    return BeginCompoundTextPath;
  })();

  var GeneralizedTextPathMode = Cgm.GeneralizedTextPathMode = (function() {
    function GeneralizedTextPathMode(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    GeneralizedTextPathMode.prototype._read = function() {
    }

    return GeneralizedTextPathMode;
  })();

  var DeviceViewportSpecMode = Cgm.DeviceViewportSpecMode = (function() {
    function DeviceViewportSpecMode(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    DeviceViewportSpecMode.prototype._read = function() {
    }

    return DeviceViewportSpecMode;
  })();

  var SegmentHighlighting = Cgm.SegmentHighlighting = (function() {
    function SegmentHighlighting(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SegmentHighlighting.prototype._read = function() {
    }

    return SegmentHighlighting;
  })();

  var EdgeRepresentation = Cgm.EdgeRepresentation = (function() {
    function EdgeRepresentation(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EdgeRepresentation.prototype._read = function() {
    }

    return EdgeRepresentation;
  })();

  var BackgroundColor = Cgm.BackgroundColor = (function() {
    function BackgroundColor(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BackgroundColor.prototype._read = function() {
      this.value = new DirectColourValue(this._io, this, this._root);
    }

    return BackgroundColor;
  })();

  var VdcType = Cgm.VdcType = (function() {
    function VdcType(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    VdcType.prototype._read = function() {
      this.width = this._io.readS2be();
    }

    return VdcType;
  })();

  var MetafileVersion = Cgm.MetafileVersion = (function() {
    function MetafileVersion(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MetafileVersion.prototype._read = function() {
    }

    return MetafileVersion;
  })();

  var ClipInheritance = Cgm.ClipInheritance = (function() {
    function ClipInheritance(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ClipInheritance.prototype._read = function() {
    }

    return ClipInheritance;
  })();

  var PatternIndex = Cgm.PatternIndex = (function() {
    function PatternIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PatternIndex.prototype._read = function() {
    }

    return PatternIndex;
  })();

  var EndMetafile = Cgm.EndMetafile = (function() {
    function EndMetafile(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EndMetafile.prototype._read = function() {
    }

    return EndMetafile;
  })();

  var TextFontIndex = Cgm.TextFontIndex = (function() {
    function TextFontIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TextFontIndex.prototype._read = function() {
    }

    return TextFontIndex;
  })();

  var MarkerClippingMode = Cgm.MarkerClippingMode = (function() {
    function MarkerClippingMode(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MarkerClippingMode.prototype._read = function() {
    }

    return MarkerClippingMode;
  })();

  var CharacterHeight = Cgm.CharacterHeight = (function() {
    function CharacterHeight(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CharacterHeight.prototype._read = function() {
    }

    return CharacterHeight;
  })();

  var LineBundleIndex = Cgm.LineBundleIndex = (function() {
    function LineBundleIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LineBundleIndex.prototype._read = function() {
    }

    return LineBundleIndex;
  })();

  var PictureDirectory = Cgm.PictureDirectory = (function() {
    function PictureDirectory(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PictureDirectory.prototype._read = function() {
    }

    return PictureDirectory;
  })();

  var PatternSize = Cgm.PatternSize = (function() {
    function PatternSize(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PatternSize.prototype._read = function() {
    }

    return PatternSize;
  })();

  var ConnectingEdge = Cgm.ConnectingEdge = (function() {
    function ConnectingEdge(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ConnectingEdge.prototype._read = function() {
    }

    return ConnectingEdge;
  })();

  var ColorValueExtent = Cgm.ColorValueExtent = (function() {
    function ColorValueExtent(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ColorValueExtent.prototype._read = function() {
      this.minColourValue = new DirectColourValue(this._io, this, this._root);
      this.maxColourValue = new DirectColourValue(this._io, this, this._root);
    }

    return ColorValueExtent;
  })();

  var Text = Cgm.Text = (function() {
    function Text(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Text.prototype._read = function() {
    }

    return Text;
  })();

  var Command = Cgm.Command = (function() {
    function Command(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Command.prototype._read = function() {
      if (KaitaiStream.mod(this._io.pos, 2) == 1) {
        this.padding = this._io.readBitsIntBe(8);
      }
      this._io.alignToByte();
      this.word = this._io.readU2be();
      if (this.baseLen == 31) {
        this.partition = this._io.readBitsIntBe(1) != 0;
      }
      if (this.baseLen == 31) {
        this.extLen = this._io.readBitsIntBe(15);
      }
    }
    Object.defineProperty(Command.prototype, 'type', {
      get: function() {
        if (this._m_type !== undefined)
          return this._m_type;
        this._m_type = (this.word & 65504);
        return this._m_type;
      }
    });
    Object.defineProperty(Command.prototype, 'baseLen', {
      get: function() {
        if (this._m_baseLen !== undefined)
          return this._m_baseLen;
        this._m_baseLen = (this.word & 31);
        return this._m_baseLen;
      }
    });
    Object.defineProperty(Command.prototype, 'len', {
      get: function() {
        if (this._m_len !== undefined)
          return this._m_len;
        this._m_len = (this.baseLen == 31 ? this.extLen : this.baseLen);
        return this._m_len;
      }
    });

    return Command;
  })();

  var EndCompoundLine = Cgm.EndCompoundLine = (function() {
    function EndCompoundLine(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EndCompoundLine.prototype._read = function() {
    }

    return EndCompoundLine;
  })();

  var MitreLimit = Cgm.MitreLimit = (function() {
    function MitreLimit(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MitreLimit.prototype._read = function() {
    }

    return MitreLimit;
  })();

  var BeginApplicationStructureBody = Cgm.BeginApplicationStructureBody = (function() {
    function BeginApplicationStructureBody(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BeginApplicationStructureBody.prototype._read = function() {
    }

    return BeginApplicationStructureBody;
  })();

  var VdcExtent = Cgm.VdcExtent = (function() {
    function VdcExtent(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    VdcExtent.prototype._read = function() {
    }

    return VdcExtent;
  })();

  var EllipticalArc = Cgm.EllipticalArc = (function() {
    function EllipticalArc(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EllipticalArc.prototype._read = function() {
    }

    return EllipticalArc;
  })();

  var EdgeTypeInitialOffset = Cgm.EdgeTypeInitialOffset = (function() {
    function EdgeTypeInitialOffset(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EdgeTypeInitialOffset.prototype._read = function() {
    }

    return EdgeTypeInitialOffset;
  })();

  var GlyphMapping = Cgm.GlyphMapping = (function() {
    function GlyphMapping(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    GlyphMapping.prototype._read = function() {
    }

    return GlyphMapping;
  })();

  var IndexPrecision = Cgm.IndexPrecision = (function() {
    function IndexPrecision(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    IndexPrecision.prototype._read = function() {
    }

    return IndexPrecision;
  })();

  var EndTileArray = Cgm.EndTileArray = (function() {
    function EndTileArray(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EndTileArray.prototype._read = function() {
    }

    return EndTileArray;
  })();

  var AlternateCharacterSetIndex = Cgm.AlternateCharacterSetIndex = (function() {
    function AlternateCharacterSetIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    AlternateCharacterSetIndex.prototype._read = function() {
    }

    return AlternateCharacterSetIndex;
  })();

  var CircularArcCenterReversed = Cgm.CircularArcCenterReversed = (function() {
    function CircularArcCenterReversed(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CircularArcCenterReversed.prototype._read = function() {
    }

    return CircularArcCenterReversed;
  })();

  var ClipIndicator = Cgm.ClipIndicator = (function() {
    function ClipIndicator(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ClipIndicator.prototype._read = function() {
    }

    return ClipIndicator;
  })();

  var CharSet = Cgm.CharSet = (function() {
    function CharSet(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CharSet.prototype._read = function() {
      this.charSetType = this._io.readS2be();
      this.name = new StrWithLen(this._io, this, this._root);
    }

    return CharSet;
  })();

  var MetafileElementList = Cgm.MetafileElementList = (function() {
    function MetafileElementList(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MetafileElementList.prototype._read = function() {
    }

    return MetafileElementList;
  })();

  var LineRepresentation = Cgm.LineRepresentation = (function() {
    function LineRepresentation(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LineRepresentation.prototype._read = function() {
    }

    return LineRepresentation;
  })();

  var ColorIndex = Cgm.ColorIndex = (function() {
    function ColorIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ColorIndex.prototype._read = function() {
      this.colourIndex = new Ui(this._io, this, this._root, this._root.colourIndexPrecision);
    }

    return ColorIndex;
  })();

  var ColorIndexPrecision = Cgm.ColorIndexPrecision = (function() {
    function ColorIndexPrecision(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ColorIndexPrecision.prototype._read = function() {
    }

    return ColorIndexPrecision;
  })();

  var BeginPicture = Cgm.BeginPicture = (function() {
    function BeginPicture(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BeginPicture.prototype._read = function() {
      this.pictureName = new StrWithLen(this._io, this, this._root);
    }

    return BeginPicture;
  })();

  var CharacterOrientation = Cgm.CharacterOrientation = (function() {
    function CharacterOrientation(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CharacterOrientation.prototype._read = function() {
    }

    return CharacterOrientation;
  })();

  var LineColor = Cgm.LineColor = (function() {
    function LineColor(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LineColor.prototype._read = function() {
    }

    return LineColor;
  })();

  var FillBundleIndex = Cgm.FillBundleIndex = (function() {
    function FillBundleIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FillBundleIndex.prototype._read = function() {
    }

    return FillBundleIndex;
  })();

  var RestrictedText = Cgm.RestrictedText = (function() {
    function RestrictedText(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    RestrictedText.prototype._read = function() {
    }

    return RestrictedText;
  })();

  var Ui = Cgm.Ui = (function() {
    function Ui(_io, _parent, _root, len) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this.len = len;

      this._read();
    }
    Ui.prototype._read = function() {
      switch (this.len) {
      case 8:
        this.value = this._io.readU1();
        break;
      case 16:
        this.value = this._io.readU2be();
        break;
      case 32:
        this.value = this._io.readU4be();
        break;
      }
    }

    return Ui;
  })();

  var MarkerSizeSpecMode = Cgm.MarkerSizeSpecMode = (function() {
    function MarkerSizeSpecMode(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MarkerSizeSpecMode.prototype._read = function() {
    }

    return MarkerSizeSpecMode;
  })();

  var PickIdentifier = Cgm.PickIdentifier = (function() {
    function PickIdentifier(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PickIdentifier.prototype._read = function() {
    }

    return PickIdentifier;
  })();

  var ProtectionRegionIndicator = Cgm.ProtectionRegionIndicator = (function() {
    function ProtectionRegionIndicator(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ProtectionRegionIndicator.prototype._read = function() {
    }

    return ProtectionRegionIndicator;
  })();

  var NamePrecision = Cgm.NamePrecision = (function() {
    function NamePrecision(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    NamePrecision.prototype._read = function() {
    }

    return NamePrecision;
  })();

  var Escape = Cgm.Escape = (function() {
    function Escape(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Escape.prototype._read = function() {
    }

    return Escape;
  })();

  var EdgeWidth = Cgm.EdgeWidth = (function() {
    function EdgeWidth(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EdgeWidth.prototype._read = function() {
    }

    return EdgeWidth;
  })();

  var GeometricPatternDefinition = Cgm.GeometricPatternDefinition = (function() {
    function GeometricPatternDefinition(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    GeometricPatternDefinition.prototype._read = function() {
    }

    return GeometricPatternDefinition;
  })();

  var BeginProtectionRegion = Cgm.BeginProtectionRegion = (function() {
    function BeginProtectionRegion(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BeginProtectionRegion.prototype._read = function() {
      this.metafileName = new StrWithLen(this._io, this, this._root);
    }

    return BeginProtectionRegion;
  })();

  var MarkerColor = Cgm.MarkerColor = (function() {
    function MarkerColor(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MarkerColor.prototype._read = function() {
    }

    return MarkerColor;
  })();

  var LineAndEdgeTypeDefinition = Cgm.LineAndEdgeTypeDefinition = (function() {
    function LineAndEdgeTypeDefinition(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LineAndEdgeTypeDefinition.prototype._read = function() {
    }

    return LineAndEdgeTypeDefinition;
  })();

  var NoOp = Cgm.NoOp = (function() {
    function NoOp(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    NoOp.prototype._read = function() {
    }

    return NoOp;
  })();

  var TransparentCellColor = Cgm.TransparentCellColor = (function() {
    function TransparentCellColor(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TransparentCellColor.prototype._read = function() {
    }

    return TransparentCellColor;
  })();

  var Polymarker = Cgm.Polymarker = (function() {
    function Polymarker(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Polymarker.prototype._read = function() {
    }

    return Polymarker;
  })();

  var HyperbolicArc = Cgm.HyperbolicArc = (function() {
    function HyperbolicArc(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    HyperbolicArc.prototype._read = function() {
    }

    return HyperbolicArc;
  })();

  var LineType = Cgm.LineType = (function() {
    function LineType(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LineType.prototype._read = function() {
    }

    return LineType;
  })();

  var EndFigure = Cgm.EndFigure = (function() {
    function EndFigure(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EndFigure.prototype._read = function() {
    }

    return EndFigure;
  })();

  var BeginMetafile = Cgm.BeginMetafile = (function() {
    function BeginMetafile(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BeginMetafile.prototype._read = function() {
      this.metafileName = new StrWithLen(this._io, this, this._root);
    }

    return BeginMetafile;
  })();

  var BitonalTile = Cgm.BitonalTile = (function() {
    function BitonalTile(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BitonalTile.prototype._read = function() {
    }

    return BitonalTile;
  })();

  var MarkerRepresentation = Cgm.MarkerRepresentation = (function() {
    function MarkerRepresentation(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MarkerRepresentation.prototype._read = function() {
    }

    return MarkerRepresentation;
  })();

  var EdgeJoin = Cgm.EdgeJoin = (function() {
    function EdgeJoin(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EdgeJoin.prototype._read = function() {
    }

    return EdgeJoin;
  })();

  var LineCap = Cgm.LineCap = (function() {
    function LineCap(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LineCap.prototype._read = function() {
    }

    return LineCap;
  })();

  var EndSegment = Cgm.EndSegment = (function() {
    function EndSegment(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EndSegment.prototype._read = function() {
    }

    return EndSegment;
  })();

  var EdgeType = Cgm.EdgeType = (function() {
    function EdgeType(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EdgeType.prototype._read = function() {
    }

    return EdgeType;
  })();

  var ScalingMode = Cgm.ScalingMode = (function() {
    function ScalingMode(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ScalingMode.prototype._read = function() {
    }

    return ScalingMode;
  })();

  var PolyBezier = Cgm.PolyBezier = (function() {
    function PolyBezier(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PolyBezier.prototype._read = function() {
    }

    return PolyBezier;
  })();

  var LineJoin = Cgm.LineJoin = (function() {
    function LineJoin(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LineJoin.prototype._read = function() {
    }

    return LineJoin;
  })();

  var TextColor = Cgm.TextColor = (function() {
    function TextColor(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TextColor.prototype._read = function() {
    }

    return TextColor;
  })();

  var ColorTable = Cgm.ColorTable = (function() {
    function ColorTable(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ColorTable.prototype._read = function() {
    }

    return ColorTable;
  })();

  var FillColor = Cgm.FillColor = (function() {
    function FillColor(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FillColor.prototype._read = function() {
    }

    return FillColor;
  })();

  var ApplicationStructureDirectory = Cgm.ApplicationStructureDirectory = (function() {
    function ApplicationStructureDirectory(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ApplicationStructureDirectory.prototype._read = function() {
    }

    return ApplicationStructureDirectory;
  })();

  var Message = Cgm.Message = (function() {
    function Message(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Message.prototype._read = function() {
    }

    return Message;
  })();

  var Transparency = Cgm.Transparency = (function() {
    function Transparency(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Transparency.prototype._read = function() {
    }

    return Transparency;
  })();

  var SymbolSize = Cgm.SymbolSize = (function() {
    function SymbolSize(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SymbolSize.prototype._read = function() {
    }

    return SymbolSize;
  })();

  var EdgeColor = Cgm.EdgeColor = (function() {
    function EdgeColor(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EdgeColor.prototype._read = function() {
    }

    return EdgeColor;
  })();

  var GeneralizedDrawingPrimitive = Cgm.GeneralizedDrawingPrimitive = (function() {
    function GeneralizedDrawingPrimitive(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    GeneralizedDrawingPrimitive.prototype._read = function() {
    }

    return GeneralizedDrawingPrimitive;
  })();

  var EndCompoundTextPath = Cgm.EndCompoundTextPath = (function() {
    function EndCompoundTextPath(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EndCompoundTextPath.prototype._read = function() {
    }

    return EndCompoundTextPath;
  })();

  var BeginSegment = Cgm.BeginSegment = (function() {
    function BeginSegment(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BeginSegment.prototype._read = function() {
      this.segmentIdentifier = new Name(this._io, this, this._root);
    }

    return BeginSegment;
  })();

  var SymbolColor = Cgm.SymbolColor = (function() {
    function SymbolColor(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SymbolColor.prototype._read = function() {
    }

    return SymbolColor;
  })();

  var VdcIntegerPrecision = Cgm.VdcIntegerPrecision = (function() {
    function VdcIntegerPrecision(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    VdcIntegerPrecision.prototype._read = function() {
    }

    return VdcIntegerPrecision;
  })();

  var TextScoreType = Cgm.TextScoreType = (function() {
    function TextScoreType(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TextScoreType.prototype._read = function() {
    }

    return TextScoreType;
  })();

  var ParabolicArc = Cgm.ParabolicArc = (function() {
    function ParabolicArc(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ParabolicArc.prototype._read = function() {
    }

    return ParabolicArc;
  })();

  var TextPrecision = Cgm.TextPrecision = (function() {
    function TextPrecision(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TextPrecision.prototype._read = function() {
    }

    return TextPrecision;
  })();

  var LineTypeInitialOffset = Cgm.LineTypeInitialOffset = (function() {
    function LineTypeInitialOffset(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LineTypeInitialOffset.prototype._read = function() {
    }

    return LineTypeInitialOffset;
  })();

  var DeviceViewport = Cgm.DeviceViewport = (function() {
    function DeviceViewport(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    DeviceViewport.prototype._read = function() {
    }

    return DeviceViewport;
  })();

  var InheritanceFilter = Cgm.InheritanceFilter = (function() {
    function InheritanceFilter(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    InheritanceFilter.prototype._read = function() {
    }

    return InheritanceFilter;
  })();

  var NonUniformRationalBSpline = Cgm.NonUniformRationalBSpline = (function() {
    function NonUniformRationalBSpline(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    NonUniformRationalBSpline.prototype._read = function() {
    }

    return NonUniformRationalBSpline;
  })();

  var CharacterSetIndex = Cgm.CharacterSetIndex = (function() {
    function CharacterSetIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CharacterSetIndex.prototype._read = function() {
    }

    return CharacterSetIndex;
  })();

  var IntegerPrecision = Cgm.IntegerPrecision = (function() {
    function IntegerPrecision(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    IntegerPrecision.prototype._read = function() {
    }

    return IntegerPrecision;
  })();

  var ColourPrecision = Cgm.ColourPrecision = (function() {
    function ColourPrecision(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ColourPrecision.prototype._read = function() {
    }

    return ColourPrecision;
  })();

  var InteriorStyleSpecMode = Cgm.InteriorStyleSpecMode = (function() {
    function InteriorStyleSpecMode(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    InteriorStyleSpecMode.prototype._read = function() {
    }

    return InteriorStyleSpecMode;
  })();

  var AppendText = Cgm.AppendText = (function() {
    function AppendText(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    AppendText.prototype._read = function() {
    }

    return AppendText;
  })();

  var EdgeVisibility = Cgm.EdgeVisibility = (function() {
    function EdgeVisibility(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EdgeVisibility.prototype._read = function() {
    }

    return EdgeVisibility;
  })();

  var Rectangle = Cgm.Rectangle = (function() {
    function Rectangle(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Rectangle.prototype._read = function() {
    }

    return Rectangle;
  })();

  var MarkerBundleIndex = Cgm.MarkerBundleIndex = (function() {
    function MarkerBundleIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MarkerBundleIndex.prototype._read = function() {
    }

    return MarkerBundleIndex;
  })();

  var NewRegion = Cgm.NewRegion = (function() {
    function NewRegion(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    NewRegion.prototype._read = function() {
    }

    return NewRegion;
  })();

  var MaximumVdcExtent = Cgm.MaximumVdcExtent = (function() {
    function MaximumVdcExtent(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    MaximumVdcExtent.prototype._read = function() {
    }

    return MaximumVdcExtent;
  })();

  var DisjointPolyline = Cgm.DisjointPolyline = (function() {
    function DisjointPolyline(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    DisjointPolyline.prototype._read = function() {
    }

    return DisjointPolyline;
  })();

  var CircularArcCenter = Cgm.CircularArcCenter = (function() {
    function CircularArcCenter(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CircularArcCenter.prototype._read = function() {
    }

    return CircularArcCenter;
  })();

  var SegmentDisplayPriority = Cgm.SegmentDisplayPriority = (function() {
    function SegmentDisplayPriority(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SegmentDisplayPriority.prototype._read = function() {
    }

    return SegmentDisplayPriority;
  })();

  var RealPrecision = Cgm.RealPrecision = (function() {
    function RealPrecision(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    RealPrecision.prototype._read = function() {
    }

    return RealPrecision;
  })();

  var BeginFigure = Cgm.BeginFigure = (function() {
    function BeginFigure(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    BeginFigure.prototype._read = function() {
    }

    return BeginFigure;
  })();

  var CharacterCodingAnnouncer = Cgm.CharacterCodingAnnouncer = (function() {
    function CharacterCodingAnnouncer(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CharacterCodingAnnouncer.prototype._read = function() {
    }

    return CharacterCodingAnnouncer;
  })();

  var SegmentTransformation = Cgm.SegmentTransformation = (function() {
    function SegmentTransformation(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SegmentTransformation.prototype._read = function() {
    }

    return SegmentTransformation;
  })();

  var TextRepresentation = Cgm.TextRepresentation = (function() {
    function TextRepresentation(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TextRepresentation.prototype._read = function() {
    }

    return TextRepresentation;
  })();

  var LineTypeContinuation = Cgm.LineTypeContinuation = (function() {
    function LineTypeContinuation(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LineTypeContinuation.prototype._read = function() {
    }

    return LineTypeContinuation;
  })();

  var Ellipse = Cgm.Ellipse = (function() {
    function Ellipse(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Ellipse.prototype._read = function() {
    }

    return Ellipse;
  })();

  var InteriorStyle = Cgm.InteriorStyle = (function() {
    function InteriorStyle(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    InteriorStyle.prototype._read = function() {
    }

    return InteriorStyle;
  })();

  var LineClippingMode = Cgm.LineClippingMode = (function() {
    function LineClippingMode(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LineClippingMode.prototype._read = function() {
    }

    return LineClippingMode;
  })();

  var ClipRectangle = Cgm.ClipRectangle = (function() {
    function ClipRectangle(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ClipRectangle.prototype._read = function() {
    }

    return ClipRectangle;
  })();

  var PatternTable = Cgm.PatternTable = (function() {
    function PatternTable(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PatternTable.prototype._read = function() {
    }

    return PatternTable;
  })();

  var CircularArcCenterClose = Cgm.CircularArcCenterClose = (function() {
    function CircularArcCenterClose(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    CircularArcCenterClose.prototype._read = function() {
    }

    return CircularArcCenterClose;
  })();

  var PolygonSet = Cgm.PolygonSet = (function() {
    function PolygonSet(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    PolygonSet.prototype._read = function() {
    }

    return PolygonSet;
  })();

  var Tile = Cgm.Tile = (function() {
    function Tile(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Tile.prototype._read = function() {
    }

    return Tile;
  })();

  var TextBundleIndex = Cgm.TextBundleIndex = (function() {
    function TextBundleIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TextBundleIndex.prototype._read = function() {
    }

    return TextBundleIndex;
  })();

  var EdgeBundleIndex = Cgm.EdgeBundleIndex = (function() {
    function EdgeBundleIndex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EdgeBundleIndex.prototype._read = function() {
    }

    return EdgeBundleIndex;
  })();

  var EdgeCap = Cgm.EdgeCap = (function() {
    function EdgeCap(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EdgeCap.prototype._read = function() {
    }

    return EdgeCap;
  })();
  Object.defineProperty(Cgm.prototype, 'namePrecision', {
    get: function() {
      if (this._m_namePrecision !== undefined)
        return this._m_namePrecision;
      this._m_namePrecision = 16;
      return this._m_namePrecision;
    }
  });
  Object.defineProperty(Cgm.prototype, 'vdcWidth', {
    get: function() {
      if (this._m_vdcWidth !== undefined)
        return this._m_vdcWidth;
      this._m_vdcWidth = Cgm.Vdc.INTEGER;
      return this._m_vdcWidth;
    }
  });
  Object.defineProperty(Cgm.prototype, 'colourIndexPrecision', {
    get: function() {
      if (this._m_colourIndexPrecision !== undefined)
        return this._m_colourIndexPrecision;
      this._m_colourIndexPrecision = 16;
      return this._m_colourIndexPrecision;
    }
  });
  Object.defineProperty(Cgm.prototype, 'directColourPrecision', {
    get: function() {
      if (this._m_directColourPrecision !== undefined)
        return this._m_directColourPrecision;
      this._m_directColourPrecision = 8;
      return this._m_directColourPrecision;
    }
  });

  return Cgm;
})();
return Cgm;
}));
