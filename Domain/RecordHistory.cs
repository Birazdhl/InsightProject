using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class RecordHistory
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public Guid? ReceiverId { get; set; }
        public DateTime? TakenOn { get; set; }
        public DateTime? ReturnDate { get; set; }
        public DateTime? Deadline { get; set; }
        public int DaysDelayed { get; set; }
    }
}
