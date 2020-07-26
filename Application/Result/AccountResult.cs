using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.Result
{
    public class AccountResult
    {
        public AccountResult() : base()
        {
            Errors = new List<string>();
        }

        //public AccountResult(bool success) : base(success) { }

        public IEnumerable<string> Errors { get; set; }

        public AccountResult(IEnumerable<string> errors)
        {
            Errors = errors;
        }

        public AccountResult(params string[] errors)
        {
            Errors = errors;
        }

        public AccountResult Failed(IEnumerable<string> errors)
        {
            Errors = errors;
            return this;
        }

        public AccountResult Failed(params string[] errors)
        {
            Errors = errors;
            return this;
        }

        public bool Success
        {
            get { return !Errors.Any(); }
        }
    }
}
