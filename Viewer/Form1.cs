using System.Collections;
using cgmsharp;

namespace Viewer;

public partial class Form1 : Form
{
    public Form1()
    {
        InitializeComponent();
    }

    private void DragEvent(DragEventArgs e)
    {
        if (e.Data.GetDataPresent(DataFormats.FileDrop))
        {
            listView1.Items.Clear();
            var files = (string[])e.Data.GetData(DataFormats.FileDrop)!;
            var file = files[0];

            using var fileStream = File.Open(file, FileMode.Open);
            var parser = new CGMParser();
            var image = parser.ParseCGM(fileStream);
            AddDebugElements(image);
            cgmCanvas1.Image = image;
            cgmCanvas1.Refresh();
        }
    }


    private void AddDebugElements(CGMImage image)
    {
        var elements = new List<Item>();
        Stringify("", image, image.GetType(), ref elements, 6);

        foreach (var i in elements) listView1.Items.Add(i.Name).SubItems.Add(i.Value);
        listView1.AutoResizeColumns(ColumnHeaderAutoResizeStyle.ColumnContent);
    }

    private void Stringify<T>(string name, T item, Type t, ref List<Item> items, int depth)
    {
        if (t.IsPrimitive || t == typeof(string) || t.IsEnum || depth <= 0)
        {
            items.Add(new(name, item?.ToString() ?? "N/A"));
        }
        else if (t.GetInterface(nameof(IEnumerable)) != null)
        {
            StringifyList(name, (IList)item!, ref items, depth - 1);
        }
        else if (Convert.GetTypeCode(item) == TypeCode.Object)
        {
            var props = t.GetFields();
            foreach (var prop in props)
            {
                var val = prop.GetValue(item);
                Stringify($"{name}.{prop.Name}", val, prop.FieldType, ref items, depth - 1);
            }
        }
    }

    private void StringifyList(string name, IEnumerable list, ref List<Item> items, int depth)
    {
        var i = 0;
        foreach (var item in list)
        {
            Stringify($"{name}[{i}]", item, item.GetType(), ref items, depth);
            i++;
        }
    }

    private void Form1_DragEnter(object sender, DragEventArgs e)
    {
        e.Effect = DragDropEffects.Copy;
    }

    private void listView1_DragDrop(object sender, DragEventArgs e)
    {
        DragEvent(e);
    }

    private void Form1_DragDrop(object sender, DragEventArgs e)
    {
        DragEvent(e);
    }

    private void listView1_DragEnter(object sender, DragEventArgs e)
    {
        e.Effect = DragDropEffects.Copy;
    }

    public record Item(string Name, string Value);
}