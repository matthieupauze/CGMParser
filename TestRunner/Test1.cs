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
            var instance = new CGM(fs);

            Assert.AreEqual(instance.fileName, "ICN-07GB6-CI");
        }
    }
}
