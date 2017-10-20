using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Bageriet.Models
{
    public class Product 
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
      
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
        //public List<Category> Category { get; set; }
        public virtual ICollection<BlogComment> BlogComment { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
        //public virtual ICollection<Category> Categories { get; set; }
        //public virtual List<Productingredients> Productingredientses { get; set; }
        public virtual ICollection<Ingredient> Ingredients { get; set; }
  
    }
}