using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Bageriet.Helpers
{
    public static class Helpers
    {
        public static HtmlString NavigationLink(this HtmlHelper html,
            string linkText,
            string actionName,
            string controllerName,
            object htmlAttributes = null)
        {
            string contextAction = (string)html.ViewContext.RouteData.Values["action"];
            string contextController = (string)html.ViewContext.RouteData.Values["controller"];

            bool isCurrent =
                string.Equals(contextAction, actionName, StringComparison.CurrentCultureIgnoreCase) &&
                string.Equals(contextController, controllerName, StringComparison.CurrentCultureIgnoreCase);

            var result = new Dictionary<string, object>();
            if (htmlAttributes != null)
            {
                var properties = TypeDescriptor.GetProperties(htmlAttributes);
                foreach (PropertyDescriptor property in properties)
                {
                    result.Add(property.Name, property.GetValue(htmlAttributes));
                }
            }

            if (isCurrent)
            {
                result.Add("class", "current");
            }

            return html.ActionLink(
                linkText,
                actionName,
                controllerName,
                routeValues: null,
                htmlAttributes: result);
        }
    }
}