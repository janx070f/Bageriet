using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Bageriet.Models;

namespace Bageriet.ViewModels
{
    public class CompanyVM
    {
        public virtual List<CompanyInfo> CompanyInfos { get; set; }
    }
}