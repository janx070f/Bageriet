using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Bageriet.Models;

namespace Bageriet.Controllers
{
    public class ShopController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        // GET: Shop
        public ActionResult Index()
        {
            return View();
        }
        //public ActionResult GetCategoryMenu()
        //{
        //    var categories = db.Categories.Include(x => x.Products);
        //    return PartialView("_Categorymenu", categories);
        //}

    }
}