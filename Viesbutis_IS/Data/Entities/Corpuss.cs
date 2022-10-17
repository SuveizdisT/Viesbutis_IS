namespace Viesbutis_IS.Data.Entities
{
    public class Corpuss
    {
        public int CorpussId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }

        public Hotel Hotel { get; set; }
    }
}
