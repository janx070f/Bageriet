using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Bageriet.Models;

namespace Bageriet.ViewModels
{
    public class BlogVM
    {
        
        public virtual List<Blog> Blog { get; set; }
        public virtual List<BlogComment> BlogComments { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}