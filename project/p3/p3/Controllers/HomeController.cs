using Microsoft.AspNetCore.Mvc;
using p3.Models;
using p3.Services;
using Newtonsoft.Json;
using System.Diagnostics;

namespace p3.Controllers
{
    public class HomeController : BaseController
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;

        }

        //public IActionResult Index()
        //{
        //    return View();
        //}

        public async Task<IActionResult> Courses()
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
            var result = JsonConvert.DeserializeObject<List<CourseModel>>(data);
            return View(result);
        }

        public async Task<IActionResult> Index()
        {
            //load a dr
            DataRetrieval dr = new DataRetrieval();
            //call the method
            var aboutString = await dr.GetData("about/");
            var degreesString = await dr.GetData("degrees/");
            var minorsString = await dr.GetData("minors/");
            //next steps
            /*
             * build about model
             * cast to json
             * 
             * feed it to the view
             */
            var aboutResult = JsonConvert.DeserializeObject<AboutModel>(aboutString);
            var degreesResult = JsonConvert.DeserializeObject<DegreesModel>(degreesString);
            var minorsResult = JsonConvert.DeserializeObject<MinorsModel>(minorsString);
            var aboutAndDegreesModel = new AboutAndDegreesModel
            {
                aboutModel = aboutResult,
                degreesModel = degreesResult,
                minorsModel = minorsResult
            };

            return View(aboutAndDegreesModel);
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
        public async Task<IActionResult> News()
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


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
