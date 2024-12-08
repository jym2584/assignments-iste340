using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using p3.Models;
using p3.Services;

public class BaseController : Controller
{

    public BaseController()
    {

    }

    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var dr = new DataRetrieval();

        var footerData = await dr.GetData("footer/");
        var footerModel = JsonConvert.DeserializeObject<FooterModel>(footerData);

        ViewData["FooterModel"] = footerModel;
        await base.OnActionExecutionAsync(context, next);
    }
}
