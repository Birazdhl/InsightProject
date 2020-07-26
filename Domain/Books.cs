using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Books
    {
        public int Id { get; set; }
        public string bookName { get; set; }
        public DateTime? issuedOn { get; set; }
        public DateTime? returnDate { get; set; }
        public Guid? issuedBy { get; set; }
        public Guid? requestedBy { get; set; }
        public bool isRequested { get; set; }
        public bool isAvailable { get; set; }
        public bool isTaken { get; set; }


    }
}
