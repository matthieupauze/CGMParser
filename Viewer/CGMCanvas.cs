using cgmsharp;

namespace Viewer
{
    public partial class CGMCanvas : UserControl
    {
        public CGMImage? Image;

        public CGMCanvas()
        {
            InitializeComponent();
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);

            if (Image == null) return;
            var picture = Image.Pictures.FirstOrDefault();
            if (picture.Name == null) return;
            e.Graphics.Clear(picture.BackgroundColour.ToColor());
            var drawZone = Rectangle.Inflate(e.ClipRectangle, -15, -15);

            var vdcWidth = float.Abs(picture.VdcTopRight.X - picture.VdcBottomLeft.X);
            var vdcHeight = float.Abs(picture.VdcTopRight.Y - picture.VdcBottomLeft.Y);
            var xScale = drawZone.Width / vdcWidth;
            var yScale = drawZone.Height / vdcHeight;

            var pen = new Pen(picture.LineColor.ToColor(), picture.LineWidth * xScale);
            var font = new Font(Image.Fonts.First(), 12f);
            var fontHeight = font.GetHeight(e.Graphics);

            var scalePoint = (PointF p) => new PointF(15 + p.X * xScale, 15 + drawZone.Height - p.Y * yScale);
            var scaleText = (PointF p) => new PointF(15 + p.X * xScale, 15 + drawZone.Height - p.Y * yScale - fontHeight);

            foreach (var line in picture.Polylines.Where(x => x.Points.Length > 0))
            {
                e.Graphics.DrawLines(pen, line.Points.Select(x => scalePoint(x.ToPointF())).ToArray());
            }
            foreach (var t in picture.Text)
            {
                e.Graphics.DrawString(t.Content, font, Brushes.Black, scaleText(t.Position.ToPointF()));
            }
        }

        private void CGMCanvas_SizeChanged(object sender, EventArgs e)
        {
            Invalidate();
        }
    }
}
