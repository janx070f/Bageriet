using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Bageriet.Models
{
    public class BlogComment
    {
        [Key]
        public int Id { get; set; }

        public string Comment { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.Now;

        public int? BlogId { get; set; }
        public int? ProductId { get; set; }

        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public string UserImage { get; set; }
        public Product Product { get; set; }

    }


}
