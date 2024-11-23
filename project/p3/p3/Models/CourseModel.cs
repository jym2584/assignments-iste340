namespace p3.Models
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<List<Root>>(myJsonResponse);
    public class CourseModel
    {
        public string courseID { get; set; }
        public string title { get; set; }
        public string description { get; set; }
    }


}
