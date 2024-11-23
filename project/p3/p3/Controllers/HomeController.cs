using Microsoft.AspNetCore.Mvc;
using p3.Models;
using p3.Services;
using Newtonsoft.Json;
using System.Diagnostics;

namespace p3.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        //public async IActionResult About()
        public async Task<IActionResult> About()
        {
           //load a dr
           DataRetrieval dr = new DataRetrieval();
            //call the method
            var AboutString = await dr.GetData("about/");
            //next steps
            /*
             * build about model
             * cast to json
             * feed it to the view
             */
            var aboutResult = JsonConvert.DeserializeObject<AboutModel>(AboutString);
            aboutResult.pageTitle = "About the iSchool!";

            return View(aboutResult);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
