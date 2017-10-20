using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Bageriet.Models;

namespace Bageriet.ViewModels
{
    public class IngredientsVM
    {
        public virtual Product Product { get; set; }
        public virtual Ingredient Ingredient { get; set; }
        public virtual List<Ingredient> Ingredients { get; set; }
        public virtual List<Product> Products { get; set; }

    }
}