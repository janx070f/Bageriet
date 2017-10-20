using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Bageriet.Models;

namespace Bageriet.ViewModels
{
    public class ProductVM
    {
        public virtual List<Category> Categories { get; set; }
        public virtual List<Ingredient> Ingredients { get; set; }
        public virtual List<Product> Products { get; set; }

        public List<Product> Product { get; set; }

        //public List<Product> Products { get; internal set; }
    }
}