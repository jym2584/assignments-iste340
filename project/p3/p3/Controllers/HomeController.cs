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

        public async Task<IActionResult> Course()
        {
            //load a dr
            DataRetrieval dr = new DataRetrieval();
            //call the method
            var data = await dr.GetData("course/");
            //next steps
            /*
             * build about model
             * cast to json
             * feed it to the view
             */
            var result = JsonConvert.DeserializeObject<CourseModel>(data);
            return View(result);
        }


        public async Task<IActionResult> Degrees()
        {
            //load a dr
            DataRetrieval dr = new DataRetrieval();
            //call the method
            var data = await dr.GetData("degrees/");
            //next steps
            /*
             * build about model
             * cast to json
             * feed it to the view
             */
            var result = JsonConvert.DeserializeObject<DegreesModel>(data);
            return View(result);
        }

        public async Task<IActionResult> Employment()
        {
            //load a dr
            DataRetrieval dr = new DataRetrieval();
            //call the method
            var data = await dr.GetData("employment/");
            //next steps
            /*
             * build about model
             * cast to json
             * feed it to the view
             */
            var result = JsonConvert.DeserializeObject<EmploymentModel>(data);
            return View(result);
        }

        public async Task<IActionResult> Footer()
        {
            //load a dr
            DataRetrieval dr = new DataRetrieval();
            //call the method
            var data = await dr.GetData("footer/");
            //next steps
            /*
             * build about model
             * cast to json
             * feed it to the view
             */
            var result = JsonConvert.DeserializeObject<FooterModel>(data);
            return View(result);
        }

        public async Task<IActionResult> Minors()
        {
            //load a dr
            DataRetrieval dr = new DataRetrieval();
            //call the method
            var data = await dr.GetData("minors/");
            //next steps
            /*
             * build about model
             * cast to json
             * feed it to the view
             */
            var result = JsonConvert.DeserializeObject<MinorsModel>(data);
            return View(result);
        }
        public async Task<IActionResult> NewsModel()
        {
            //load a dr
            DataRetrieval dr = new DataRetrieval();
            //call the method
            var data = await dr.GetData("news/");
            //next steps
            /*
             * build about model
             * cast to json
             * feed it to the view
             */
            var result = JsonConvert.DeserializeObject<NewsModel>(data);
            return View(result);
        }

        public async Task<IActionResult> People()
        {
            //load a dr
            DataRetrieval dr = new DataRetrieval();
            //call the method
            var data = await dr.GetData("people/");
            //next steps
            /*
             * build about model
             * cast to json
             * feed it to the view
             */
            var result = JsonConvert.DeserializeObject<PeopleModel>(data);
            return View(result);
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
