using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Bageriet.Models;
using Bageriet.ViewModels;
using Microsoft.Ajax.Utilities;
using System.Collections;
using Bageriet.Extention;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using ActionResult = System.Web.Mvc.ActionResult;
using Controller = System.Web.Mvc.Controller;

namespace Bageriet.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IdentityService _identityService;
        public HomeController()
        {
            db = new ApplicationDbContext();
            _identityService = new IdentityService(db);
        }
        // GET: Home
        public ActionResult Index()
        {

            ContentVm vm = new ContentVm()
            {
                SliderList = db.Sliders.OrderByDescending(s => s.Id).Take(4).OrderBy(s => s.Id).ToList(),
                //Products = db.Products.OrderByDescending(p => p.Id).Take(8).OrderBy(p => p.Id).ToList(),
                Products = db.Products.OrderByDescending(x => Guid.NewGuid()).Take(8).ToList(),
                Blogs = db.Blog.OrderByDescending(x => x.Id).Take(3).OrderBy(x => x.Id).ToList(),
            };
            return View(vm);


        }


        #region Produkter


        public ActionResult Product(int? id)
        {

            List<Product> products = new List<Product>();

            if (id != null)
            {
                products = db.Products.Where(x => x.CategoryId == id).ToList();
            }
            else
            {
                products = db.Products.ToList();
            }

            return View(products);
        }
        public ActionResult ProductDetail(int id)
        {
            Product product = db.Products.Find(id);
            return View(product);
        }
        #endregion


        [HttpPost]
        public ActionResult _CreateComment(BlogComment blogComment)
        {
            if (ModelState.IsValid)
            {
                blogComment.UserId = User.Identity.GetUserId();
                db.BlogComments.Add(blogComment);
                db.SaveChanges();
            }
            return RedirectToAction("ProductDetail", "Home", new { id = blogComment.ProductId });
        }

        #region Contact
        /// <summary>
        /// Contact
        /// </summary>
        /// <returns></returns>
        /// 
       


        public ActionResult Contact()
        {
            CompanyInfo companyInfo = db.CompanyInfos.FirstOrDefault();

            return View(companyInfo);
        }
        [System.Web.Mvc.HttpPost]
        public ActionResult Contact(string Name, string Email, string Subject, string Message)
        {
            Contact cont = new Contact();
            cont.Name = Name;
            cont.Email = Email;
            cont.Subject = Subject;
            cont.Message = Message;
            db.Contacts.Add(cont);
            db.SaveChanges();

            return RedirectToAction("Contact", "Home");
        }
        #endregion

        #region Search


        //[HttpGet]
        public ActionResult Search(string query)
        {
            SearchVM vm = new SearchVM();
            //multible Search
            //var split = new[] {" ", ",", "."};

            // check if query is NULL

            if (!string.IsNullOrEmpty(query))
            {
                var array = query.Split(new string[] { " ", "," }, StringSplitOptions.RemoveEmptyEntries);

                foreach (var search in array)
                {
                    //find events "%Like% query
                    vm.Ingredients.AddRange(db.Ingredients

                        .Where(s => s.Name.ToLower().Contains(search) || s.Amount.ToLower().Contains(search))  // ToLower laver alt til små bogstaver sådan at man også kan søge på både store og små bogstaver
                        .ToList());



                    //find products "%Like% query  
                    vm.Products.AddRange(db.Products
                        .Where(p => p.Title.ToLower().Contains(search) || p.Description.ToLower().Contains(search))
                        .ToList());

                }
                vm.Ingredients = vm.Ingredients.DistinctBy(x => x.Name).ToList();
                vm.Products = vm.Products.DistinctBy(x => x.Title).ToList();


            }
            return View(vm);
        }

        #endregion

        public ActionResult Login()
        {
            return View();
        }


        #region Subscriber
        /// <summary>
        /// Subscribers to newsletter
        /// </summary>
        /// <param name="email"></param>

        public ActionResult NewSubscriber(string email)
        {
            Subscriber sub = new Subscriber()
            {
                Email = email
            };
            db.Subscribers.Add(sub);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        #endregion

        [HttpPost]
        public void AddLike(Like Like)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser currentUser = _identityService.GetUserById(User.Identity.GetUserId());
                if (db.Likes.Any(x => x.UserId == currentUser.Id && x.ProductId == Like.ProductId))
                {
                    Like like = db.Likes.FirstOrDefault(x => x.ProductId == Like.ProductId && x.UserId == currentUser.Id);
                    db.Likes.Remove(like);
                    db.SaveChanges();

                }
                else
                {
                    Like.UserId = User.Identity.GetUserId();
                    db.Likes.Add(Like);
                    db.SaveChanges();

                }
            }
            
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public ActionResult CategoryList()
        {
            return View();
        }

       
    }

}

