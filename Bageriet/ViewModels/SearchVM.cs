using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Bageriet.Models;

namespace Bageriet.ViewModels
{
    public class SearchVM
    {
        public List<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
        //public List<About> Abouts { get; set; } = new List<About>();
        public List<Product> Products { get; set; } = new List<Product>();
        //public List<Donation> Donations { get; set; } = new List<Donation>();
        //public List<Story> Stories { get; set; } = new List<Story>();
    }
}