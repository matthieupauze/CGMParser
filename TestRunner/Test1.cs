using cgmsharp;

namespace TestRunner
{
    [TestClass]
    public sealed class Test1
    {
        [TestMethod]
        public void TestMethod1()
        {
            var path = Path.Join(Directory.GetCurrentDirectory(), "test.cgm");
            var fs = new FileStream(path, FileMode.Open);
            var parser = new CGMParser();
            var image = parser.ParseCGM(fs);

            Assert.AreEqual(image.fileName, "ICN-07GB6-CI");
            Assert.AreEqual(image.metafileVersion, FileVersion.v3);
        }
    }
}
