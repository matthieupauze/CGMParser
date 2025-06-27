using cgmsharp;

namespace TestRunner;

[TestClass]
public sealed class Test1
{
    [TestMethod]
    public void TestSimpleImage()
    {
        var path = Path.Join(Directory.GetCurrentDirectory(), "test-simple.cgm");
        var fs = new FileStream(path, FileMode.Open);
        var parser = new CGMParser();
        var image = parser.ParseCGM(fs);

        Assert.AreEqual("ICN-07GB6-CI", image.FileName);
        Assert.AreEqual(FileVersion.v3, image.MetafileVersion);
        Assert.AreEqual(VDCType.Integer, image.VdcType);
    }

    [TestMethod]
    public void TestComplexImage()
    {
        var path = Path.Join(Directory.GetCurrentDirectory(), "test-complex.cgm");
        var fs = new FileStream(path, FileMode.Open);
        var parser = new CGMParser();
        var image = parser.ParseCGM(fs);

        Assert.AreEqual("ICN-C0419-S1000D0361-001-01", image.FileName);
        Assert.AreEqual(FileVersion.v4, image.MetafileVersion);
        Assert.AreEqual(VDCType.Real, image.VdcType);
    }
}