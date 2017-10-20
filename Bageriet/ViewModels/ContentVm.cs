using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Bageriet.Models;

namespace Bageriet.ViewModels
{
    public class ContentVm
    {
        public virtual List<Contact> Contact { get; set; }
        public virtual List<Blog> Blogs { get; set; }
        public virtual List<Slider> SliderList { get; set; }

        public virtual List<Product> Products { get; set; }
       
    }
}