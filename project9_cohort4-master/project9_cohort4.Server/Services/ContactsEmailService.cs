using MailKit.Net.Smtp;
using MimeKit;


namespace project9_cohort4.Server.Services
{

    public class ContactsEmailService
    {
        private readonly string _smtpServer = "smtp.gmail.com"; // Change to your SMTP server
        private readonly int _smtpPort = 587; // SMTP port
        private readonly string _smtpUser = "batoulkhazali96@gmail.com"; // Your email
        private readonly string _smtpPass = "ygpv tlkb kfza jwpb"; // Your email password or app password

        public async Task SendContactEmailAsync(string name, string fromEmail, string subject, string message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(name, fromEmail));
            emailMessage.To.Add(new MailboxAddress("PetPath", "batoulkhazali96@gmail.com"));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart("plain")
            {
                Text = $"Message from {name} ({fromEmail}):\n\n{message}"
            };

            using var client = new SmtpClient();
            await client.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_smtpUser, _smtpPass);
            await client.SendAsync(emailMessage);
            await client.DisconnectAsync(true);
        }

        public async Task SendReplyEmailAsync(string senderEmail, string toEmail, string subject, string message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("User", senderEmail)); // Sender's email
            emailMessage.To.Add(new MailboxAddress("Recipient", toEmail));  // Recipient's email
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart("plain")
            {
                Text = message
            };

            using var client = new SmtpClient();
            await client.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_smtpUser, _smtpPass); // SMTP server credentials
            await client.SendAsync(emailMessage);
            await client.DisconnectAsync(true);
        }

    }

}
