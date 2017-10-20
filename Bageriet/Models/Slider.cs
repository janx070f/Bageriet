using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Bageriet.Models
{
    public class Slider
    {
        [Key]
        public int Id { get; set; }

        public string ImageUrl { get; set; }
    }
}