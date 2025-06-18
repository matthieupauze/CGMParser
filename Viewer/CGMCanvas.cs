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

            e.Graphics.DrawString("Doot", new("Arial", 16), Brushes.Black, 0, 0);
        }
    }
}
