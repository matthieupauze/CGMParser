import { CharSetType, ChunkType, ColourSelectionMode, Vdc } from './consts.js'
import { KaitaiStream } from './KaitaiStream.js'

class Command {

  /**
   * @type {KaitaiStream}
   */
  _stream

  /**
   * @type {CgmParser}
   */
  _root

  /**
   * @param {KaitaiStream} stream
   * @param {CgmParser} root
   */
  constructor(stream, root) {
    this._stream = stream
    this._root = root


    // this.read()
  }

  /**
   * @abstract
   */
  read() {
    throw new Error("Read must be implemented")
  }

  readString() {
    const len = this._stream.readU1();
    console.log('doot', len)
    return KaitaiStream.bytesToStr(this._stream.readBytes(len), "UTF-8");
  }
}

export class Chunk extends Command {
  read() {
    this.cmd = new CommandHeader(this._stream, this._root);
    this.cmd.read();
    const rawBody = this._stream.readBytes(this.cmd.len)
    const newStream = new KaitaiStream(rawBody)
    switch (this.cmd.type) {
      case ChunkType.BEGIN_METAFILE:
        this.body = new BeginMetafile(newStream, this._root)
        break;
      default:
        // console.error("Unsupported tag in file", ChunkType[this.cmd.type])
        return;
    }
    this.body.read()
    console.log(this.body)
  }
}
export class BeginApplicationStructure extends Command { }
export class HatchStyleDefinition extends Command { }
export class CharacterExpansionFactor extends Command { }
export class HatchIndex extends Command { }
export class SavePrimitiveContext extends Command { }
export class BeginTileArray extends Command { }
export class SymbolLibraryList extends Command { }
export class ApplicationStructureAttribute extends Command { }
export class SymbolLibraryIndex extends Command { }
export class DeviceViewportMapping extends Command { }
export class NonUniformBSpline extends Command { }
export class Name extends Command { }
export class InterpolatedInterior extends Command { }
export class AuxiliaryColor extends Command { }
export class MarkerType extends Command { }
export class ColorCalibration extends Command { }
export class BeginPictureBody extends Command { }
export class EllipticalArcClose extends Command { }
export class RestrictedTextType extends Command { }
export class Point extends Command { }
export class EndPicture extends Command { }
export class EdgeWidthSpecMode extends Command { }
export class MetafileDefaultsReplacement extends Command { }
export class StrWithLen extends Command { }
export class CharacterSetList extends Command { }
export class LineWidthSpecMode extends Command { }
export class EndProtectionRegion extends Command { }
export class Polygon extends Command { }
export class LineWidth extends Command { }
export class MetafileDescription extends Command { }
export class EdgeTypeContinuation extends Command { }
export class Circle extends Command { }
export class ApplicationData extends Command { }
export class MarkerSize extends Command { }
export class SymbolOrientation extends Command { }
export class VdcRealPrecision extends Command { }
export class TextAlignment extends Command { }
export class CharacterSpacing extends Command { }
export class Polyline extends Command { }
export class TextPath extends Command { }
export class SegmentPriorityExtent extends Command { }
export class ColorSelectionMode extends Command { }
export class CopySegment extends Command { }
export class FontList extends Command { }
export class FontProperties extends Command { }
export class PolySymbol extends Command { }
export class FillRepresentation extends Command { }
export class FillReferencePoint extends Command { }
export class ColorModel extends Command { }
export class DirectColourValue extends Command { }
export class CellArray extends Command { }
export class SegmentPickPriority extends Command { }
export class EdgeClippingMode extends Command { }
export class CircularArc3Point extends Command { }
export class EndApplicationStructure extends Command { }
export class RestorePrimitiveContext extends Command { }
export class MaxColorIndex extends Command { }
export class CircularArc3PointClose extends Command { }
export class BeginCompoundLine extends Command { }
export class AspectSourceFlags extends Command { }
export class BeginCompoundTextPath extends Command { }
export class GeneralizedTextPathMode extends Command { }
export class DeviceViewportSpecMode extends Command { }
export class SegmentHighlighting extends Command { }
export class EdgeRepresentation extends Command { }
export class BackgroundColor extends Command { }
export class MetafileVersion extends Command { }
export class ClipInheritance extends Command { }
export class PatternIndex extends Command { }
export class EndMetafile extends Command { }
export class TextFontIndex extends Command { }
export class MarkerClippingMode extends Command { }
export class CharacterHeight extends Command { }
export class LineBundleIndex extends Command { }
export class PictureDirectory extends Command { }
export class PatternSize extends Command { }
export class ConnectingEdge extends Command { }
export class ColorValueExtent extends Command { }
export class Text extends Command { }
export class CommandHeader extends Command {
  get type() {
    return (this.word & 65504);
  }

  get baseLen() {
    return (this.word & 31);
  }

  get len() {
    return (this.baseLen == 31 ? this.extLen : this.baseLen);
  }

  read() {
    if (this._stream.pos % 2 == 1) {
      const _ = this._stream.readBitsIntBe(1);
    }
    this._stream.alignToByte();
    this.word = this._stream.readU2be();
    if (this.baseLen == 31) {
      this.partition = this._stream.readBitsIntBe(1) != 0;
    }
    if (this.baseLen == 31) {
      this.extLen = this._stream.readBitsIntBe(15);
    }
  }
}
export class EndCompoundLine extends Command { }
export class MitreLimit extends Command { }
export class BeginApplicationStructureBody extends Command { }
export class VdcExtent extends Command { }
export class EllipticalArc extends Command { }
export class EdgeTypeInitialOffset extends Command { }
export class GlyphMapping extends Command { }
export class IndexPrecision extends Command { }
export class EndTileArray extends Command { }
export class AlternateCharacterSetIndex extends Command { }
export class CircularArcCenterReversed extends Command { }
export class ClipIndicator extends Command { }
export class CharSet extends Command { }
export class MetafileElementList extends Command { }
export class LineRepresentation extends Command { }
export class ColorIndex extends Command { }
export class ColorIndexPrecision extends Command { }
export class BeginPicture extends Command { }
export class CharacterOrientation extends Command { }
export class LineColor extends Command { }
export class FillBundleIndex extends Command { }
export class RestrictedText extends Command { }
export class Ui extends Command { }
export class MarkerSizeSpecMode extends Command { }
export class PickIdentifier extends Command { }
export class ProtectionRegionIndicator extends Command { }
export class NamePrecision extends Command { }
export class Escape extends Command { }
export class EdgeWidth extends Command { }
export class GeometricPatternDefinition extends Command { }
export class BeginProtectionRegion extends Command { }
export class MarkerColor extends Command { }
export class LineAndEdgeTypeDefinition extends Command { }
export class NoOp extends Command { }
export class TransparentCellColor extends Command { }
export class Polymarker extends Command { }
export class HyperbolicArc extends Command { }
export class LineType extends Command { }
export class EndFigure extends Command { }
export class BeginMetafile extends Command {
  metafileName = ''
  read() {
    const val = this.readString();
    this.metafileName = val
  }
}
export class BitonalTile extends Command { }
export class MarkerRepresentation extends Command { }
export class EdgeJoin extends Command { }
export class LineCap extends Command { }
export class EndSegment extends Command { }
export class EdgeType extends Command { }
export class ScalingMode extends Command { }
export class PolyBezier extends Command { }
export class LineJoin extends Command { }
export class TextColor extends Command { }
export class ColorTable extends Command { }
export class FillColor extends Command { }
export class ApplicationStructureDirectory extends Command { }
export class Message extends Command { }
export class Transparency extends Command { }
export class SymbolSize extends Command { }
export class EdgeColor extends Command { }
export class GeneralizedDrawingPrimitive extends Command { }
export class EndCompoundTextPath extends Command { }
export class BeginSegment extends Command { }
export class SymbolColor extends Command { }
export class VdcIntegerPrecision extends Command { }
export class TextScoreType extends Command { }
export class ParabolicArc extends Command { }
export class TextPrecision extends Command { }
export class LineTypeInitialOffset extends Command { }
export class DeviceViewport extends Command { }
export class InheritanceFilter extends Command { }
export class NonUniformRationalBSpline extends Command { }
export class CharacterSetIndex extends Command { }
export class IntegerPrecision extends Command { }
export class ColourPrecision extends Command { }
export class InteriorStyleSpecMode extends Command { }
export class AppendText extends Command { }
export class EdgeVisibility extends Command { }
export class Rectangle extends Command { }
export class MarkerBundleIndex extends Command { }
export class NewRegion extends Command { }
export class MaximumVdcExtent extends Command { }
export class DisjointPolyline extends Command { }
export class CircularArcCenter extends Command { }
export class SegmentDisplayPriority extends Command { }
export class RealPrecision extends Command { }
export class BeginFigure extends Command { }
export class CharacterCodingAnnouncer extends Command { }
export class SegmentTransformation extends Command { }
export class TextRepresentation extends Command { }
export class LineTypeContinuation extends Command { }
export class Ellipse extends Command { }
export class InteriorStyle extends Command { }
export class LineClippingMode extends Command { }
export class ClipRectangle extends Command { }
export class PatternTable extends Command { }
export class CircularArcCenterClose extends Command { }
export class PolygonSet extends Command { }
export class Tile extends Command { }
export class TextBundleIndex extends Command { }
export class EdgeBundleIndex extends Command { }
export class EdgeCap extends Command { }

export class CgmParser {
  namePrecision = 16
  vdcWidth = Vdc.INTEGER
  colourIndexPrecision = 16
  directColourPrecision = 8

  /**
   * @type {Chunk[]}
   */
  chunks = [];

  /**
  * @param {ArrayBuffer} buffer
  */
  constructor(buffer) {
    this._stream = new KaitaiStream(buffer)
    let i = 0;
    do {
      let c = new Chunk(this._stream, this);
      c.read()
      this.chunks.push(c);
      i++;
    } while (!(this._stream.isEof()));
    console.log(this.chunks)
  }
}
