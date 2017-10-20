using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace FasionOnline.Models
{
    public class StringHandlingTools
    {
        public static string RemoveMultipleSpaces(string Input)
        {
            Input = Regex.Replace(Input, @"\s+", " ");

            return (Input);
        }

        public static string RemoveSpaces(string Input)
        {
            Input = Input.Replace(" ", String.Empty);

            return (Input);
        }

        public static string RemoveAllNonLetterCharactersFromString(string Input)
        {
            Input = new string((from c in Input
                                where char.IsWhiteSpace(c) || char.IsLetterOrDigit(c)
                                select c
                                ).ToArray());

            return (Input);
        }

        public static string RemoveNumbersFromString(string Input)
        {
            Input = Regex.Replace(Input, "[0-9]", "");

            return (Input);
        }

        public static string ToUpperAfterSpecifiedChar(char SearchCharacter,
                                                       string Input)
        {
            int SearchPosition = Input.IndexOf(SearchCharacter);

            if (SearchPosition > 0)
            {
                Input = Input.Substring(0, SearchPosition + 1) +
                        Input[SearchPosition + 1].ToString().ToUpper() +
                        Input.Substring(SearchPosition + 2);
            }

            return (Input);
        }

        public static string ToLowercaseAndSpecifiedCharacterToUpper(string Input,
                                                                     char SpecifiedCharacter)
        {
            Input = Input.Trim();
            Input = Input.ToLower();
            Input = RemoveNumbersFromString(Input);
            Input = RemoveAllNonLetterCharactersFromString(Input);
            Input = RemoveMultipleSpaces(Input);
            Input = Input[0].ToString().ToUpper() + Input.Substring(1);
            Input = ToUpperAfterSpecifiedChar(SpecifiedCharacter, Input);

            return (Input);
        }

        public static string ToUpperCaseAndRemoveUnwantedCharacters(string Input)
        {
            Input = Input.Trim();
            Input = Input.ToUpper();
            Input = RemoveAllNonLetterCharactersFromString(Input);
            Input = RemoveSpaces(Input);

            return (Input);
        }
    }
}