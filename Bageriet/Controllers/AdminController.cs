using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Bageriet.Models;
using Bageriet.ViewModels;
using System.Web.Hosting;
using Microsoft.AspNet.Identity;


namespace Bageriet.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {

        private ApplicationDbContext db = new ApplicationDbContext();


        // GET: Admin
        [System.Web.Mvc.Authorize]
        public ActionResult Index()
        {

            return View();
        }

        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }

        #region Contact

        /// <summary>
        /// Contacts
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="Email"></param>
        /// <param name="Subject"></param>
        /// <param name="Message"></param>
        /// <returns></returns>

        public ActionResult Contact(string Name, string Email, string Subject, string Message)
        {
            ContentVm cont = new ContentVm()
            {
                Contact = db.Contacts.ToList()
            };
            return View(cont);
        }

        public ActionResult DeleteContact(int id)
        {
            Contact Contact = db.Contacts.Find(id);
            if (Contact.GetType().GetProperty("IsActive") != null)
            {
                //If Contact have the property IsActive

                //Contact.IsActive = false;
                db.Entry(Contact).State = EntityState.Modified;
                db.SaveChanges();
            }
            else
            {
                db.Contacts.Remove(Contact);
                db.SaveChanges();
            }

            return RedirectToAction("Contact");
        }

        #endregion

        #region Category

        /// <summary>
        /// Category. Where it´s possible to  view, change, edit, and delete Categories 
        /// </summary>
        /// <returns></returns>

        public ActionResult CategoryList()
        {
            List<Category> categories = db.Categories.ToList();
            return View(categories);
        }

        [HttpGet]
        public ActionResult CategoryEdit(int? id)
        {
            Category cat = db.Categories.Find(id);
            return View(cat);
        }

        [HttpPost]
        public ActionResult CategoryEdit(int? id, string Title, string Description)
        {
            Category cat = db.Categories.Find(id);
            cat.Title = Title;
            cat.Description = Description;

            db.SaveChanges();
            return RedirectToAction("CategoryList");

        }

        [HttpGet]
        public ActionResult CategoryCreate()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CategoryCreate(string Title, string Description)
        {
            Category cat = new Category();
            cat.Title = Title;
            cat.Description = Description;

            db.Categories.Add(cat);
            db.SaveChanges();
            return RedirectToAction("CategoryList");

        }


        public ActionResult DeleteCategory(int id)
        {
            Category Category = db.Categories.Find(id);

            db.Categories.Remove(Category);
            db.SaveChanges();


            return RedirectToAction("CategoryList");
        }

        #endregion


        //#region Ingredients
        ///// <summary>
        ///// Ingredients. Where it´s possible to  view, change, edit, and delete Ingredients 
        ///// </summary>
        ///// <returns></returns>

        //public ActionResult IngredientList()
        //{
        //    List<Ingredient> ingredient = db.Ingredients.ToList();
        //    return View(ingredient);

        //}

        //[HttpGet]
        //public ActionResult IngredientCreate()
        //{
        //    return View();
        //}

        //[HttpPost]
        //public ActionResult IngredientCreate(string Name)
        //{
        //    Ingredient ing = new Ingredient();
        //    ing.Name = Name;
        //    db.Ingredients.Add(ing);
        //    db.SaveChanges();
        //    return RedirectToAction("CategoryList");
        //}

        //[HttpGet]
        //public ActionResult IngredientEdit(int? id)
        //{
        //    Ingredient ing = db.Ingredients.Find(id);
        //    return View(ing);
        //}

        //[HttpPost]
        //public ActionResult IngredientEdit(int? id, string Name)
        //{
        //    Ingredient ing = db.Ingredients.Find(id);
        //    ing.Name = Name;
        //    db.SaveChanges();
        //    return RedirectToAction("IngredientList");

        //}


        //public ActionResult DeleteIngredients(int id)
        //{
        //    Ingredient Ingredient = db.Ingredients.Find(id);

        //    db.Ingredients.Remove(Ingredient);
        //    db.SaveChanges();


        //    return RedirectToAction("IngredientList");
        //}

        //#endregion

        //#region Amounts
        ///// <summary>
        ///// Amounts. Where it´s possible to  view, change, edit, and delete Amounts 
        ///// </summary>
        ///// <returns></returns>

        //public ActionResult RecipeList()
        //{
        //    List<Recipe> Recipe = db.Recipes.ToList();
        //    return View(Recipe);

        //}

        //[HttpGet]
        //public ActionResult RecipeCreate()
        //{
        //    return View();
        //}

        //[HttpPost]
        //public ActionResult RecipeCreate(string Name, string Description)
        //{
        //    Recipe rec = new Recipe();
        //    rec.Name = Name;
        //    rec.Description = Description;

        //    db.Recipes.Add(rec);
        //    db.SaveChanges();
        //    return RedirectToAction("CategoryList");

        //}


        //[HttpGet]
        //public ActionResult RecipeEdit(int? id)
        //{
        //    Recipe rec = db.Recipes.Find(id);
        //    return View(rec);
        //}

        //[HttpPost]
        //public ActionResult RecipeEdit(int? id, string Name)
        //{
        //    Recipe rec = db.Recipes.Find(id);
        //    rec.Name = Name;
        //    db.SaveChanges();
        //    return RedirectToAction("RecipeList");

        //}


        //public ActionResult DeleteAmount(int id)
        //{
        //    Recipe recipe = db.Recipes.Find(id);

        //    db.Recipes.Remove(recipe);
        //    db.SaveChanges();


        //    return RedirectToAction("RecipeList");
        //}

        //#endregion


        #region Product

        /// <summary>
        /// Product. Where it´s possible to  view, change, edit, and delete products
        /// </summary>
        /// <returns></returns>

        public ActionResult ProductList()
        {
            List<Category> allCategories = db.Categories.ToList();
            return View(allCategories);
        }

        [HttpGet]
        public ActionResult ProductCreate()
        {

            ProductVM vm = new ProductVM()
            {
                Categories = db.Categories.ToList(),
                Ingredients = db.Ingredients.ToList()
            };
            return View(vm);
        }

        [HttpPost] /*int[] SizeId,*/
        public ActionResult ProductCreate(string Title, string Description, int CategoryId, int[] IngredientsId, string ImageUrl, HttpPostedFileBase file)
        {
            var fileComplete = "";
            if (file != null && file.ContentLength > 0)
            {
                var fileExtension = Path.GetExtension(file.FileName);
                var fileName = Guid.NewGuid().ToString();
                fileComplete = fileName + fileExtension;
                var path = Path.Combine(Server.MapPath("/Uploads/"), fileComplete);
                file.SaveAs(path);
            }

            Product prod = new Product();
            prod.Title = Title;
            prod.Description = Description;

            prod.ImageUrl = ImageUrl;

            prod.CategoryId = CategoryId;
            prod.ImageUrl = fileComplete;
            db.Products.Add(prod);
            db.SaveChanges();
            return RedirectToAction("ProductList");
        }


        [HttpGet]
        public ActionResult ProductDetail(int Id)
        {

            IngredientsVM vm = new IngredientsVM()
            {
                Product = db.Products.Find(Id),
                
            };


            return View(vm);
        }

        [HttpPost]
        public ActionResult _AddIngredients(Ingredient ingredient)
        {
            if (ModelState.IsValid)
            {
               
                db.Ingredients.Add(ingredient);
                db.SaveChanges();
            }

           
            return RedirectToAction("ProductDetail", "Admin", new { id = ingredient.ProductId });
        }



        [HttpGet]
        public ActionResult ProductEdit(int? Id) // når der er ? så kan den være null, og så er det nemmere at lave en if
        {
            ProductVM vm = new ProductVM()
            {
                Categories = db.Categories.ToList(),
                Ingredients = db.Ingredients.ToList(),
                Product = db.Products.ToList()
            };
            return View(vm);
        }


        [HttpPost]
        public ActionResult ProductEdit(int Id, string Title, string Description, int CategoryId, int[] IngredientsId, string ImageUrl, HttpPostedFileBase file)
        {
            Product prod = db.Products.Find(Id);
            var fileComplete = "";
            if (file != null && file.ContentLength > 0)
            {
                System.IO.File.Delete(HostingEnvironment.ApplicationPhysicalPath + "/Uploads/" + prod.ImageUrl);
                var fileExtension = Path.GetExtension(file.FileName);
                var fileName = Guid.NewGuid().ToString();
                fileComplete = fileName + fileExtension;
                var path = Path.Combine(Server.MapPath("/Uploads/"), fileComplete);
                file.SaveAs(path);
                prod.ImageUrl = fileComplete;
            }

            prod.Title = Title;
            prod.Description = Description;


            db.SaveChanges();
            return RedirectToAction("ProductList");
        }

        public ActionResult ProductDelete(int Id)
        {
            Product prod = db.Products.Find(Id);
            System.IO.File.Delete(HostingEnvironment.ApplicationPhysicalPath + "/Uploads/" + prod.ImageUrl);
            db.Products.Remove(prod);
            db.SaveChanges();

            return RedirectToAction("ProductList");
        }

        #endregion

        #region Newsletter

        /// <summary>
        /// Newsletter. Where it´s possible to  view, change, edit, and delete about us 
        /// </summary>
        /// <returns></returns>

        public ActionResult NewsletterList()
        {
            List<Newsletter> newsletters = db.Newsletters.ToList();
            return View(newsletters);
        }

        [HttpGet]
        public ActionResult NewsletterCreate()
        {
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult NewsletterCreate(string Title, string HtmlContent)
        {
            Newsletter news = new Newsletter()
            {
                Title = Title,
                HtmlContent = HtmlContent
            };
            db.Newsletters.Add(news);
            db.SaveChanges();
            return RedirectToAction("NewsletterList");
        }


        [HttpGet]
        public ActionResult NewsletterSend(int? id)
        {
            NewsletterVM vm = new NewsletterVM()
            {
                Newsletter = db.Newsletters.Find(id),
                Subscribers = db.Subscribers.ToList()
            };

            return View(vm);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult NewsletterSend(string[] Email, string HtmlContent)
        {
            foreach (var item in Email)
            {
                MailMessage message = new MailMessage();

                message.From = new MailAddress("janx070f@gmail.com");
                message.To.Add(new MailAddress(item));

                message.IsBodyHtml = true;
                message.BodyEncoding = Encoding.UTF8;
                message.Subject = "subject";
                message.Body = HtmlContent;

                SmtpClient client = new SmtpClient();
                client.Send(message);
            }
            return RedirectToAction("NewsletterList");
        }

        public ActionResult DeleteNewsletter(int id)
        {
            Newsletter Newsletter = db.Newsletters.Find(id);

            db.Newsletters.Remove(Newsletter);
            db.SaveChanges();

            return RedirectToAction("NewsletterList");
        }

        #endregion

        #region About

        /// <summary>
        /// About. Where it´s possible to  view, change, edit, and delete about us 
        /// </summary>
        /// <returns></returns>

        public ActionResult AboutList()
        {
            List<About> allAbouts = db.Abouts.ToList();

            return View(allAbouts);
        }

        [HttpGet]
        public ActionResult AboutCreate()
        {

            return View();
        }

        [HttpPost]
        public ActionResult AboutCreate(string Title, string Description)
        {

            About about = new About

            {
                Title = Title,
                Description = Description,

            };
            db.Abouts.Add(about);
            db.SaveChanges();


            return RedirectToAction("AboutList");
        }



        [HttpGet]
        public ActionResult AboutEdit(int? id)
        {
            About about = db.Abouts.Find(id);

            return View(about);
        }

        [HttpPost]
        public ActionResult AboutEdit(int id, string Title, string Description)
        {

            About about = db.Abouts.Find(id);
            about.Title = Title;
            about.Description = Description;


            db.SaveChanges();
            return RedirectToAction("AboutList");
        }

        public ActionResult AboutDelete(int id)
        {

            About about = db.Abouts.Find(id);
            db.Abouts.Remove(about);
            db.SaveChanges();

            return RedirectToAction("AboutList");
        }

        #endregion

        #region Blog

        /// <summary>
        /// Blog/ News, with comments
        /// </summary>
        /// <returns></returns>

        public ActionResult BlogList()
        {
            var blog = db.Blog.ToList().OrderByDescending(x => x.DateCreated);
            return View(blog);
        }


        public ActionResult BlogDetail(int id)
        {
            Blog blog = db.Blog.Find(id);
            return View(blog);
        }

        [HttpGet]
        public ActionResult BlogCreate()
        {
            Blog blog = new Blog();
            return View(blog);
        }

        [HttpPost]
        public ActionResult BlogCreate(string Title, string Content, string UserId, string DateCreated, string ImageUrl,
            HttpPostedFileBase file)
        {
            var fileComplete = "";
            if (file != null && file.ContentLength > 0)
            {
                var fileExtension = Path.GetExtension(file.FileName);
                var fileName = Guid.NewGuid().ToString();
                fileComplete = fileName + fileExtension;
                var path = Path.Combine(Server.MapPath("/Uploads/"), fileComplete);
                file.SaveAs(path);
            }

            Blog blog = new Blog
            {
                Title = Title,
                Content = Content,
                DateCreated = DateTime.Now,
                UserId = User.Identity.GetUserId()
            };

            blog.ImageUrl = fileComplete;

            db.Blog.Add(blog);
            db.SaveChanges();
            return RedirectToAction("BlogList");
        }

        [HttpGet]
        public ActionResult BlogEdit(int? Id)
        {

            Blog blog = db.Blog.Find(Id);

            return View(blog);

        }

        [HttpPost]
        public ActionResult BlogEdit(int Id, string Title, string Content, string ImageUrl, HttpPostedFileBase file)
        {
            Blog blog = db.Blog.Find(Id);
            var fileComplete = "";
            if (file != null && file.ContentLength > 0)
            {
                System.IO.File.Delete(HostingEnvironment.ApplicationPhysicalPath + "/Uploads/" + blog.ImageUrl);
                var fileExtension = Path.GetExtension(file.FileName);
                var fileName = Guid.NewGuid().ToString();
                fileComplete = fileName + fileExtension;
                var path = Path.Combine(Server.MapPath("/Uploads/"), fileComplete);
                file.SaveAs(path);
                blog.ImageUrl = fileComplete;
            }

            blog.Title = Title;
            blog.Content = Content;


            db.SaveChanges();
            return RedirectToAction("BlogList");
        }

        public ActionResult DeleteBlog(int id)
        {
            Blog Blog = db.Blog.Find(id);

            System.IO.File.Delete(HostingEnvironment.ApplicationPhysicalPath + "/Uploads/" + Blog.ImageUrl);
            db.Blog.Remove(Blog);
            db.SaveChanges();
            return RedirectToAction("BlogList");
        }

        #region Comment

        /// <summary>
        /// Comment for Blog
        /// </summary>
        /// <param name="blogComment"></param>
        /// <returns></returns>

        [HttpPost]
        public ActionResult BlogComment(BlogComment blogComment)
        {
            if (ModelState.IsValid)
            {
                blogComment.UserId = User.Identity.GetUserId();
                db.BlogComments.Add(blogComment);
                db.SaveChanges();
            }
            return RedirectToAction("BlogDetail", "Admin", new { id = blogComment.BlogId });
        }


        public ActionResult DeleteBlogComment(int id)
        {
            BlogComment comment = db.BlogComments.Find(id);

            db.BlogComments.Remove(comment);
            db.SaveChanges();


            return RedirectToAction("BlogDetail", "Admin", new { id = comment.BlogId });
        }

        #endregion

        #endregion

        #region Slider

        public ActionResult SliderList()
        {
            var slider = db.Sliders.ToList();
            return View(slider);
        }


        [HttpGet]
        public ActionResult SliderCreate()
        {
            Slider slider = new Slider();
            return View(slider);
        }

        [HttpPost]
        public ActionResult SliderCreate(string ImageUrl, HttpPostedFileBase file)
        {
            Slider slider = new Slider();
            var fileComplete = "";
            if (file != null && file.ContentLength > 0)
            {
                var fileExtension = Path.GetExtension(file.FileName);
                var fileName = Guid.NewGuid().ToString();
                fileComplete = fileName + fileExtension;
                var path = Path.Combine(Server.MapPath("/Uploads/slider/"), fileComplete);
                file.SaveAs(path);
            }

            slider.ImageUrl = fileComplete;

            db.Sliders.Add(slider);
            db.SaveChanges();
            return RedirectToAction("SliderList");
        }

        [HttpGet]
        public ActionResult SliderEdit(int? Id)
        {

            Slider slider = db.Sliders.Find(Id);

            return View(slider);

        }

        [HttpPost]
        public ActionResult SliderEdit(int Id, string Title, string Content, string ImageUrl, HttpPostedFileBase file)
        {
            Slider slider = db.Sliders.Find(Id);
            var fileComplete = "";
            if (file != null && file.ContentLength > 0)
            {
                System.IO.File.Delete(HostingEnvironment.ApplicationPhysicalPath + "/Uploads/slider/" + slider.ImageUrl);
                var fileExtension = Path.GetExtension(file.FileName);
                var fileName = Guid.NewGuid().ToString();
                fileComplete = fileName + fileExtension;
                var path = Path.Combine(Server.MapPath("/Uploads/slider/"), fileComplete);
                file.SaveAs(path);
                slider.ImageUrl = fileComplete;
            }

            db.SaveChanges();
            return RedirectToAction("SliderList");
        }

        public ActionResult DeleteSlider(int id)
        {
            Slider slider = db.Sliders.Find(id);

            System.IO.File.Delete(HostingEnvironment.ApplicationPhysicalPath + "/Uploads/slider/" + slider.ImageUrl);
            db.Sliders.Remove(slider);
            db.SaveChanges();


            return RedirectToAction("SliderList");
        }

        #endregion

        #region CompanyInfo

        public ActionResult CompanyList()
        {
            var company = db.CompanyInfos.FirstOrDefault();
            return View(company);
        }
        [HttpGet]
        public ActionResult CompanyCreate()
        {
            CompanyInfo comp = new CompanyInfo();

            return View(comp);
        }

        public ActionResult CompanyCreate(string Name, string Street, int Number, string ZipCode
            , string City, string Country, string PhoneNumber)
        {

            CompanyInfo cinfo = new CompanyInfo()

            {
                Name = Name,
                Street = Street,
                Number = Number,
                ZipCode = ZipCode,
                City = City,
                Country = Country,
                PhoneNumber = PhoneNumber
            };
            db.CompanyInfos.Add(cinfo);
            db.SaveChanges();

            return RedirectToAction("CompanyList");
        }
        [HttpGet]
        public ActionResult CompanyEdit(int? id)
        {
            CompanyInfo cinfo = db.CompanyInfos.Find(id);

            return View(cinfo);
        }

        [HttpPost]
        public ActionResult CompanyEdit(int id, string Name, string Street, int Number, string ZipCode
            , string City, string Country, string PhoneNumber)
        {

            CompanyInfo cinfo = db.CompanyInfos.Find(id);

            cinfo.Name = Name;
            cinfo.Street = Street;
                cinfo.Number = Number;
            cinfo.ZipCode = ZipCode;
            cinfo.City = City;
            cinfo.Country = Country;
            cinfo.PhoneNumber = PhoneNumber;

                       
            db.SaveChanges();
            return RedirectToAction("CompanyList");
        }

        public ActionResult CompanyDelete(int id)
        {

            CompanyInfo cinfo = db.CompanyInfos.Find(id);
            db.CompanyInfos.Remove(cinfo);
            db.SaveChanges();

            return RedirectToAction("CompanyList");
        }
        #endregion

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }


    }
}
