using System.Diagnostics;
using exampleApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace exampleApp.Controllers
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

        public IActionResult Privacy()
        {
            return View();
        }



        public IActionResult NoModel()
        {
            return View();
        }

        public IActionResult withModel()
        {
            var getWithModel = new WithModel();
            getWithModel.Title = "Some hard coded title for now";
            getWithModel.Description = "Some long winded word salad with lots of words";
            getWithModel.pageTitle = "Up top title";
            getWithModel.HowMany = 10;
            return View(getWithModel);

            //return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
