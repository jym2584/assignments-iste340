using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using p3.Models;
using p3.Services;

namespace p3.Controllers
{
    public class BaseController : Controller
    {
        public BaseController()
        {
            // Initialize DataRetrieval
            DataRetrieval dr = new DataRetrieval();

            // Load the footer data (or other global data)
            var footerData = dr.GetData("footer/").Result; // Assuming GetData is asynchronous, you might want to call it synchronously here for initialization purposes.

            // Deserialize the footer data into the FooterModel
            var footerModel = JsonConvert.DeserializeObject<FooterModel>(footerData);

            // Store the footerModel in ViewData for use in the layout
            ViewData["FooterModel"] = footerModel;
        }
    }

}
