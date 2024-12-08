namespace p3.Models
{
    public class AboutModel
    {
        public string title {  get; set; }
        public string description { get; set; }
        public string quote { get; set; }
        public string quoteAuthor { get; set; }
    }


    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Graduate
    {
        public string degreeName { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public List<string> concentrations { get; set; }
        public List<string> availableCertificates { get; set; }
    }

    public class DegreesModel
    {
        public List<Undergraduate> undergraduate { get; set; }
        public List<Graduate> graduate { get; set; }
    }

    public class Undergraduate
    {
        public string degreeName { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public List<string> concentrations { get; set; }
    }

    public class AboutAndDegreesModel
    {
        public AboutModel aboutModel { get; set; }
        public DegreesModel degreesModel { get; set; }

        public MinorsModel minorsModel { get; set; }
    }



}
