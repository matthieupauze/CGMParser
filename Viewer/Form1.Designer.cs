namespace Viewer
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            listView1 = new ListView();
            columnName = new ColumnHeader();
            columnValue = new ColumnHeader();
            cgmCanvas1 = new CGMCanvas();
            SuspendLayout();
            // 
            // listView1
            // 
            listView1.AllowDrop = true;
            listView1.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left;
            listView1.Columns.AddRange(new ColumnHeader[] { columnName, columnValue });
            listView1.Location = new Point(12, 12);
            listView1.Name = "listView1";
            listView1.Size = new Size(444, 554);
            listView1.TabIndex = 0;
            listView1.UseCompatibleStateImageBehavior = false;
            listView1.View = View.Details;
            listView1.DragDrop += listView1_DragDrop;
            listView1.DragEnter += listView1_DragEnter;
            // 
            // columnName
            // 
            columnName.Text = "Name";
            // 
            // columnValue
            // 
            columnValue.Text = "Value";
            // 
            // cgmCanvas1
            // 
            cgmCanvas1.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            cgmCanvas1.BackColor = Color.White;
            cgmCanvas1.Location = new Point(462, 12);
            cgmCanvas1.Margin = new Padding(30);
            cgmCanvas1.Name = "cgmCanvas1";
            cgmCanvas1.Padding = new Padding(30);
            cgmCanvas1.Size = new Size(493, 554);
            cgmCanvas1.TabIndex = 1;
            // 
            // Form1
            // 
            AllowDrop = true;
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(967, 578);
            Controls.Add(cgmCanvas1);
            Controls.Add(listView1);
            Name = "Form1";
            Text = "Form1";
            DragDrop += Form1_DragDrop;
            DragEnter += Form1_DragEnter;
            ResumeLayout(false);
        }

        #endregion

        private ListView listView1;
        private CGMCanvas cgmCanvas1;
        private ColumnHeader columnName;
        private ColumnHeader columnValue;
    }
}
