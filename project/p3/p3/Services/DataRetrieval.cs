using System.Net.Http.Headers;

namespace p3.Services
{
    public class DataRetrieval
    {
        /*
         * Task vs Thread
         * Task has async/await and a return value
         *  (there is no direct way to return from a thread)
         * Task can do multiple things at once, Thread one
         * can cancel a task
         * Task is a higher level concept than a Thread...
         */
        public async Task<string> GetData(string d)
        {
            //using - at the end of the statement, automatically calls Dispose
            using (var client = new HttpClient())
            {
                //set up
                client.BaseAddress = new Uri("https://ischool.gccis.rit.edu/api/");
                client.DefaultRequestHeaders.Accept.Clear();
                //now create my own header (mime type)
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                try
                {
                    HttpResponseMessage response = await client.GetAsync(d,
                        HttpCompletionOption.ResponseHeadersRead);
                    response.EnsureSuccessStatusCode();
                    //go get it...
                    var data = await response.Content.ReadAsStringAsync();
                    return data;
                }
                catch (HttpRequestException hre)
                {
                    var msg = hre.Message;
                    return "Hre: " + msg;
                }
                catch (Exception e)
                {
                    var msg = e.Message;
                    return "Ex: " + msg;
                }
            }
        }
    }
}
