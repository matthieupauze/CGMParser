using cgmsharp;

namespace Viewer
{
    public partial class CGMCanvas : UserControl
    {
        public Metafile? Image;

        public CGMCanvas()
        {
            InitializeComponent();
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);

            if (!Image.HasValue) return;
            var image = Image.Value;
            var picture = image.Picture;
            e.Graphics.Clear(picture.BackgroundColour.ToColor());
            var drawZone = Rectangle.Inflate(e.ClipRectangle, -15, -15);

            var vdcWidth = double.Abs(picture.VdcTopRight.X - picture.VdcBottomLeft.X);
            var vdcHeight = double.Abs(picture.VdcTopRight.Y - picture.VdcBottomLeft.Y);
            var xScale = drawZone.Width / vdcWidth;
            var yScale = drawZone.Height / vdcHeight;

            var fxScale = (float)xScale;
            var fyScale = (float)yScale;
            var width = (float)(picture.LineWidth * fxScale);
            var pen = new Pen(picture.LineColor.ToColor(), width);
            var font = new Font(image.Fonts.First(), 12f);
            var fontHeight = font.GetHeight(e.Graphics);

            PointF ScalePoint(PointF p)
            {
                var x = 15 + p.X * fxScale;
                var y = 15 + drawZone.Height - p.Y * fyScale;
                return new(x, y);
            }

            PointF ScaleText(PointF p)
            {
                var x = 15 + p.X * fxScale;
                var y = 15 + drawZone.Height - p.Y * fyScale - fontHeight;
                return new(x, y);
            }

            foreach (var line in picture.Polylines.Where(x => x.Points.Length > 0))
            {
                var floatLines = line.Points.Select(x =>
                {
                    var floated = x.ToPointF();
                    var scaled = ScalePoint(floated);
                    return scaled;
                }).ToArray();
                e.Graphics.DrawLines(pen, floatLines);
            }

            foreach (var t in picture.Text)
                e.Graphics.DrawString(t.Content, font, Brushes.Black, ScaleText(t.Position.ToPointF()));
        }

        private void CGMCanvas_SizeChanged(object sender, EventArgs e)
        {
            Invalidate();
        }
    }
}
