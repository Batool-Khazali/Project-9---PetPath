using System;
using System.Collections.Generic;

namespace project9_cohort4.Server.Models;

public partial class Contact
{
    public int ContactId { get; set; }

    public string? SenderName { get; set; }

    public string? SenderEmail { get; set; }

    public string? Subject { get; set; }

    public string? Message { get; set; }

    public DateTime? SentAt { get; set; }

    public string? AdminReply { get; set; }
}
