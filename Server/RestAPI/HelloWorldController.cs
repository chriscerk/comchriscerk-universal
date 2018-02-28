using AspCoreServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AspCoreServer.Controllers
{
  [Route("api/[controller]")]
  public class HelloWorldController : Controller
  {
    public HelloWorldController(){}

    [HttpGet]
    public string Get()
    {
        return "Hello World";
    }
  }
}