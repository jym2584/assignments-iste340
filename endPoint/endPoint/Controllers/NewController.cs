using Microsoft.AspNetCore.Mvc;

namespace endPoint.Controllers
{
    public class NewController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
