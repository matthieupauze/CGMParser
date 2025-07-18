import {
  CharSetType,
  ChunkType,
  COLOUR_SELECTION_MODE,
  REAL_PRECISION,
  INTEGER_PRECISION,
  PRECISION_CHOICE,
  Vdc,
  SIZE_SPECIFICATION,
} from "./consts.js";
import { KaitaiStream } from "./KaitaiStream/KaitaiStream.js";

const debug = true;

class Command {
  /**
   * @type {KaitaiStream}
   */
  io;

  /**
   * @type {CgmParser}
   */
  root;

  /**
   * @param {KaitaiStream} stream
   * @param {CgmParser} root
   */
  constructor(stream, root) {
    this.io = stream;
    this.root = root;
  }

  /**
   * @abstract
   */
  read() {
    console.error("Read must be implemented");
  }

  readString() {
    const len = this.io.readU1();
    return KaitaiStream.bytesToStr(this.io.readBytes(len), "UTF-8");
  }

  readVdc() {
    if (this.root.vdcWidth === Vdc.INTEGER) {
      return this.readSI(this.root.vdcIntegerPrecision);
    }
    return this.readReal(this.root.vdcRealPrecision);
  }

  /**
   *
   * @param {number} precision
   */
  readSI(precision = this.root.integerPrecision) {
    switch (precision) {
      case INTEGER_PRECISION._8:
        return this.io.readS1();
      case INTEGER_PRECISION._16:
        return this.io.readS2be();
      case INTEGER_PRECISION._24:
        const bytes = this.io.readBytes(3);
        return (bytes[0] << 16) | (bytes[1] << 8) | bytes[2];
      case INTEGER_PRECISION._32:
        return this.io.readS4be();
    }
    throw new Error(`Integer precision out of range at ${precision} bits`);
  }

  /**
   *
   * @param {number} precision
   */
  readReal(precision = this.root.realPrecision) {
    switch (precision) {
      case REAL_PRECISION._32BitFixed: {
        const whole = this.io.readS2be();
        const fraction = this.io.readU2be();
        return whole + fraction / 0x8000;
      }
      case REAL_PRECISION._64BitFixed: {
        const whole = this.io.readS4be();
        const fraction = this.io.readU4be();
        return whole + fraction / 0x8000;
      }
      case REAL_PRECISION._32BitFloat:
        return this.io.readF4be();
      case REAL_PRECISION._64BitFloat:
        return this.io.readF8be();
    }

    throw new Error(`Floating precision out of range ${precision}`);
  }

  readDirectColour() {
    switch (this.root.directColourPrecision) {
      case 8:
        return this.io.readU1();
    }

    throw new Error(
      `Unexpected direct colour precision: ${this.root.directColourPrecision}`
    );
  }

  readRealPrecision() {
    const fpOrFixed = this.io.readS2be();
    const wholeWidth = this.readSI();
    const _fieldWidth = this.readSI();
    if (fpOrFixed == PRECISION_CHOICE.Floating) {
      if (wholeWidth == 9) {
        return REAL_PRECISION._32BitFloat;
      }
      return REAL_PRECISION._64BitFloat;
    }
    if (wholeWidth == 16) {
      return REAL_PRECISION._32BitFixed;
    }
    return REAL_PRECISION._64BitFixed;
  }

  /**
   *
   * @param {number} precision
   * @returns number
   */
  readUI(precision) {
    switch (precision) {
      case INTEGER_PRECISION._8:
        return this.io.readU1();
      case INTEGER_PRECISION._16:
        return this.io.readU2be();
      case INTEGER_PRECISION._24:
        return this.io.readU1();
      case INTEGER_PRECISION._32:
        return this.io.readU4be();
    }

    throw new Error(`Unsigned int precision out of range ${precision}`);
  }

  readColourIndex() {
    return this.readUI(this.root.colourIndexPrecision);
  }

  readColour() {
    if (this.root.colorSelectionMode == COLOUR_SELECTION_MODE.DIRECT) {
      return new RgbColour(
        this.readDirectColour(),
        this.readDirectColour(),
        this.readDirectColour()
      );
    }
    const index = this.readColourIndex();
    return this.root.colourTable[index];
  }

  /**
   *
   * @param {number} sizeSpecification
   */
  readSizeSpecification(sizeSpecification) {
    if (sizeSpecification === SIZE_SPECIFICATION.ABSOLUTE) {
      return this.readVdc();
    }
    return this.readReal();
  }
}

export class Chunk extends Command {
  read() {
    this.cmd = new CommandHeader(this.io, this.root);
    this.cmd.read();
    const rawBody = this.io.readBytes(this.cmd.len);
    const newStream = new KaitaiStream(rawBody);
    switch (this.cmd.type) {
      case ChunkType.BEGIN_METAFILE:
        this.body = new BeginMetafile(newStream, this.root);
        break;
      case ChunkType.VDC_TYPE:
        this.body = new VdcType(newStream, this.root);
        break;
      case ChunkType.COLOUR_PRECISION:
        this.body = new ColourPrecision(newStream, this.root);
        break;
      case ChunkType.INTEGER_PRECISION:
        this.body = new IntegerPrecision(newStream, this.root);
        break;
      case ChunkType.REAL_PRECISION:
        this.body = new RealPrecision(newStream, this.root);
        break;
      case ChunkType.COLOR_INDEX_PRECISION:
        this.body = new ColorIndexPrecision(newStream, this.root);
        break;
      case ChunkType.VDC_REAL_PRECISION:
        this.body = new VdcRealPrecision(newStream, this.root);
        break;
      case ChunkType.BACKGROUND_COLOR:
        this.body = new BackgroundColour(newStream, this.root);
        break;
      case ChunkType.POLYLINE:
        this.body = new Polyline(newStream, this.root);
        break;
      case ChunkType.LINE_CAP:
        this.body = new LineCap(newStream, this.root);
        break;
      case ChunkType.LINE_COLOR:
        this.body = new LineColour(newStream, this.root);
        break;
      case ChunkType.COLOUR_TABLE:
        this.body = new ColourTable(newStream, this.root);
        break;
      case ChunkType.COLOUR_SELECTION_MODE:
        this.body = new ColourSelectionMode(newStream, this.root);
        break;
      case ChunkType.LINE_WIDTH_SPEC_MODE:
        this.body = new LineWidthSpecMode(newStream, this.root);
        break;
      case ChunkType.LINE_WIDTH:
        this.body = new LineWidth(newStream, this.root);
        break;
      case ChunkType.EDGE_WIDTH_SPEC_MODE:
        this.body = new EdgeWidthSpecMode(newStream, this.root);
        break;
      case ChunkType.EDGE_WIDTH:
        this.body = new EdgeWidth(newStream, this.root);
        break;
      case ChunkType.MARKER_SIZE_SPEC_MODE:
        this.body = new MarkerSizeSpecMode(newStream, this.root);
        break;
      case ChunkType.MARKER_SIZE:
        this.body = new MarkerSize(newStream, this.root);
        break;
      default:
        console.error("Unparsed tag in file", ChunkType[this.cmd.type]);
        break;
    }
    this.body?.read();
    const bytesRead = newStream.pos;

    // if (this.body instanceof LineColour) {
    //   // console.log(this.body.colour);
    //   // throw new Error();
    // }

    if (debug && this.body && bytesRead !== this.cmd.len) {
      console.warn(
        "Stream not fully read",
        `Read ${bytesRead} / ${this.cmd.len}`,
        this.body,
        ChunkType[this.cmd.type]
      );
      throw new Error();
    }
  }
}
export class BeginApplicationStructure extends Command {}
export class VdcType extends Command {
  read() {
    this.root.vdcWidth = this.io.readS2be();
  }
}
export class HatchStyleDefinition extends Command {}
export class CharacterExpansionFactor extends Command {}
export class HatchIndex extends Command {}
export class SavePrimitiveContext extends Command {}
export class BeginTileArray extends Command {}
export class SymbolLibraryList extends Command {}
export class ApplicationStructureAttribute extends Command {}
export class SymbolLibraryIndex extends Command {}
export class DeviceViewportMapping extends Command {}
export class NonUniformBSpline extends Command {}
export class Name extends Command {}
export class InterpolatedInterior extends Command {}
export class AuxiliaryColor extends Command {}
export class MarkerType extends Command {}
export class ColorCalibration extends Command {}
export class BeginPictureBody extends Command {}
export class EllipticalArcClose extends Command {}
export class RestrictedTextType extends Command {}
export class EndPicture extends Command {}
export class EdgeWidthSpecMode extends Command {
  read() {
    this.root.edgeWidthSpecification = this.io.readS2be();
  }
}
export class MetafileDefaultsReplacement extends Command {}
export class StrWithLen extends Command {}
export class CharacterSetList extends Command {}
export class LineWidthSpecMode extends Command {
  read() {
    this.root.lineWidthSpecification = this.io.readS2be();
  }
}
export class EndProtectionRegion extends Command {}
export class Polygon extends Command {}
export class LineWidth extends Command {
  read() {
    this.lineWidth = this.readSizeSpecification(
      this.root.lineWidthSpecification
    );
  }
}
export class MetafileDescription extends Command {}
export class EdgeTypeContinuation extends Command {}
export class Circle extends Command {}
export class ApplicationData extends Command {}
export class MarkerSize extends Command {
  read() {
    this.markerSize = this.readSizeSpecification(
      this.root.markerSizeSpecification
    );
  }
}
export class SymbolOrientation extends Command {}
export class VdcRealPrecision extends Command {
  read() {
    this.root.vdcRealPrecision = this.readRealPrecision();
  }
}
export class TextAlignment extends Command {}
export class CharacterSpacing extends Command {}
export class Polyline extends Command {
  /**
   * @type {Point[]}
   */
  points = [];
  read() {
    while (!this.io.isEof()) {
      this.points.push(new Point(this.readVdc(), this.readVdc()));
    }
  }
}
export class TextPath extends Command {}
export class SegmentPriorityExtent extends Command {}
export class ColourSelectionMode extends Command {
  read() {
    this.root.colorSelectionMode = this.io.readS2be();
  }
}
export class CopySegment extends Command {}
export class FontList extends Command {}
export class FontProperties extends Command {}
export class PolySymbol extends Command {}
export class FillRepresentation extends Command {}
export class FillReferencePoint extends Command {}
export class ColorModel extends Command {}
export class CellArray extends Command {}
export class SegmentPickPriority extends Command {}
export class EdgeClippingMode extends Command {}
export class CircularArc3Point extends Command {}
export class EndApplicationStructure extends Command {}
export class RestorePrimitiveContext extends Command {}
export class MaxColorIndex extends Command {}
export class CircularArc3PointClose extends Command {}
export class BeginCompoundLine extends Command {}
export class AspectSourceFlags extends Command {}
export class BeginCompoundTextPath extends Command {}
export class GeneralizedTextPathMode extends Command {}
export class DeviceViewportSpecMode extends Command {}
export class SegmentHighlighting extends Command {}
export class EdgeRepresentation extends Command {}
export class BackgroundColour extends Command {
  read() {
    this.colour = new RgbColour(
      this.readDirectColour(),
      this.readDirectColour(),
      this.readDirectColour()
    );
  }
}
export class MetafileVersion extends Command {}
export class ClipInheritance extends Command {}
export class PatternIndex extends Command {}
export class EndMetafile extends Command {}
export class TextFontIndex extends Command {}
export class MarkerClippingMode extends Command {}
export class CharacterHeight extends Command {}
export class LineBundleIndex extends Command {}
export class PictureDirectory extends Command {}
export class PatternSize extends Command {}
export class ConnectingEdge extends Command {}
export class ColorValueExtent extends Command {}
export class Text extends Command {}
export class CommandHeader extends Command {
  /**
   * @type {keyof ChunkType}
   */
  // @ts-ignore
  type;

  /**
   * @type {number | undefined}
   */
  baseLen;

  /**
   * @type {number | undefined}
   */
  len;

  read() {
    if (this.io.pos % 2 == 1) {
      const _ = this.io.readBitsIntBe(1);
    }
    this.io.alignToByte();
    this.word = this.io.readU2be();

    this.baseLen = this.word & 31;
    // @ts-ignore
    this.type = this.word & 65504;

    if (this.baseLen == 31) {
      this.partition = this.io.readBitsIntBe(1) != 0;
      this.extLen = this.io.readBitsIntBe(15);
      this.len = this.extLen;
    } else {
      this.len = this.baseLen;
    }
  }
}
export class EndCompoundLine extends Command {}
export class MitreLimit extends Command {}
export class BeginApplicationStructureBody extends Command {}
export class VdcExtent extends Command {}
export class EllipticalArc extends Command {}
export class EdgeTypeInitialOffset extends Command {}
export class GlyphMapping extends Command {}
export class IndexPrecision extends Command {}
export class EndTileArray extends Command {}
export class AlternateCharacterSetIndex extends Command {}
export class CircularArcCenterReversed extends Command {}
export class ClipIndicator extends Command {}
export class CharSet extends Command {}
export class MetafileElementList extends Command {}
export class LineRepresentation extends Command {}
export class ColorIndex extends Command {}
export class ColorIndexPrecision extends Command {
  read() {
    this.root.colourIndexPrecision = this.readSI();
  }
}
export class BeginPicture extends Command {}
export class CharacterOrientation extends Command {}
export class LineColour extends Command {
  read() {
    this.colour = this.readColour();
  }
}
export class FillBundleIndex extends Command {}
export class RestrictedText extends Command {}
export class Ui extends Command {}
export class MarkerSizeSpecMode extends Command {
  read() {
    this.root.markerSizeSpecification = this.io.readS2be();
  }
}
export class PickIdentifier extends Command {}
export class ProtectionRegionIndicator extends Command {}
export class NamePrecision extends Command {}
export class Escape extends Command {}
export class EdgeWidth extends Command {
  read() {
    this.edgeWidth = this.readSizeSpecification(
      this.root.edgeWidthSpecification
    );
  }
}
export class GeometricPatternDefinition extends Command {}
export class BeginProtectionRegion extends Command {}
export class MarkerColor extends Command {}
export class LineAndEdgeTypeDefinition extends Command {}
export class NoOp extends Command {}
export class TransparentCellColor extends Command {}
export class Polymarker extends Command {}
export class HyperbolicArc extends Command {}
export class LineType extends Command {}
export class EndFigure extends Command {}
export class BeginMetafile extends Command {
  metafileName = "";
  read() {
    this.metafileName = this.readString();
  }
}
export class BitonalTile extends Command {}
export class MarkerRepresentation extends Command {}
export class EdgeJoin extends Command {}
export class LineCap extends Command {
  read() {
    this.lineCap = this.io.readS2be();
    this.dashCap = this.io.readS2be();
  }
}
export class EndSegment extends Command {}
export class EdgeType extends Command {}
export class ScalingMode extends Command {}
export class PolyBezier extends Command {}
export class LineJoin extends Command {}
export class TextColor extends Command {}
export class ColourTable extends Command {
  read() {
    const tableIndex = this.readColourIndex();
    if (tableIndex != 0) {
      throw new Error(
        `Unexpected starting table index, found '${tableIndex}' instead of 0`
      );
    }
    while (!this.io.isEof()) {
      this.root.colourTable.push(
        new RgbColour(
          this.readDirectColour(),
          this.readDirectColour(),
          this.readDirectColour()
        )
      );
    }
  }
}
export class FillColor extends Command {}
export class ApplicationStructureDirectory extends Command {}
export class Message extends Command {}
export class Transparency extends Command {}
export class SymbolSize extends Command {}
export class EdgeColor extends Command {}
export class GeneralizedDrawingPrimitive extends Command {}
export class EndCompoundTextPath extends Command {}
export class BeginSegment extends Command {}
export class SymbolColor extends Command {}
export class VdcIntegerPrecision extends Command {}
export class TextScoreType extends Command {}
export class ParabolicArc extends Command {}
export class TextPrecision extends Command {}
export class LineTypeInitialOffset extends Command {}
export class DeviceViewport extends Command {}
export class InheritanceFilter extends Command {}
export class NonUniformRationalBSpline extends Command {}
export class CharacterSetIndex extends Command {}
export class IntegerPrecision extends Command {
  read() {
    this.root.integerPrecision = this.io.readS2be();
  }
}
export class ColourPrecision extends Command {
  read() {
    this.root.directColourPrecision = this.io.readS2be();
  }
}
export class InteriorStyleSpecMode extends Command {}
export class AppendText extends Command {}
export class EdgeVisibility extends Command {}
export class Rectangle extends Command {}
export class MarkerBundleIndex extends Command {}
export class NewRegion extends Command {}
export class MaximumVdcExtent extends Command {}
export class DisjointPolyline extends Command {}
export class CircularArcCenter extends Command {}
export class SegmentDisplayPriority extends Command {}
export class RealPrecision extends Command {
  read() {
    this.root.realPrecision = this.readRealPrecision();
  }
}
export class BeginFigure extends Command {}
export class CharacterCodingAnnouncer extends Command {}
export class SegmentTransformation extends Command {}
export class TextRepresentation extends Command {}
export class LineTypeContinuation extends Command {}
export class Ellipse extends Command {}
export class InteriorStyle extends Command {}
export class LineClippingMode extends Command {}
export class ClipRectangle extends Command {}
export class PatternTable extends Command {}
export class CircularArcCenterClose extends Command {}
export class PolygonSet extends Command {}
export class Tile extends Command {}
export class TextBundleIndex extends Command {}
export class EdgeBundleIndex extends Command {}
export class EdgeCap extends Command {}
export class Point {
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
export class RgbColour {
  /**
   *
   * @param {number} r Red component 0 - 255
   * @param {number} g Green component 0 - 255
   * @param {number} b Blue component 0 - 255
   */
  constructor(r, g, b) {
    this.#check(r);
    this.#check(g);
    this.#check(b);
    this.r = r;
    this.g = g;
    this.b = b;
  }

  /**
   *
   * @param {number} c
   */
  #check(c) {
    if (c < 0 || c > 255) {
      throw new Error("Colour out of bounds");
    }
  }
}

export class CgmParser {
  namePrecision = 16;
  colourIndexPrecision = 8;
  directColourPrecision = 8;
  /**
   * @type {number}
   */
  vdcWidth = Vdc.INTEGER;
  /**
   * @type {number}
   */
  colorSelectionMode = COLOUR_SELECTION_MODE.INDEXED;
  /**
   * @type {number}
   */
  integerPrecision = INTEGER_PRECISION._16;
  /**
   * @type {number}
   */
  realPrecision = REAL_PRECISION._32BitFixed;
  /**
   * @type {number}
   */
  vdcIntegerPrecision = INTEGER_PRECISION._16;
  /**
   * @type {number}
   */
  vdcRealPrecision = REAL_PRECISION._32BitFixed;

  /**
   * @type {number}
   */
  lineWidthSpecification = SIZE_SPECIFICATION.SCALED;
  /**
   * @type {number}
   */
  markerSizeSpecification = SIZE_SPECIFICATION.SCALED;
  /**
   * @type {number}
   */
  edgeWidthSpecification = SIZE_SPECIFICATION.SCALED;

  /**
   * @type {RgbColour[]}
   */
  colourTable = [];

  /**
   * @type {Chunk[]}
   */
  chunks = [];

  /**
   * @param {ArrayBuffer} buffer
   */
  constructor(buffer) {
    this.io = new KaitaiStream(buffer);
    let i = 0;
    do {
      let c = new Chunk(this.io, this);
      c.read();
      this.chunks.push(c);
      i++;
    } while (!this.io.isEof());
    console.log(this.chunks, this);
  }
}
