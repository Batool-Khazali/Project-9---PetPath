using System;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;

public class EmailService
{
    private readonly string _smtpServer = "smtp.gmail.com"; // Your SMTP server
    private readonly int _smtpPort = 587; // SMTP port
    private readonly string _smtpUser = "batoulkhazali96@gmail.com";
    private readonly string _smtpPass = "ygpv tlkb kfza jwpb";

    public EmailService(IConfiguration configuration) // Dependency Injection for configuration
    {
        _smtpUser = configuration["EmailSettings:SmtpUser"];
        _smtpPass = configuration["EmailSettings:SmtpPass"];
    }

    public async Task SendAdoptionEmailAsync(string userName, string userEmail, int animalId)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("PetPath", _smtpUser));
        emailMessage.To.Add(new MailboxAddress(userName, userEmail));
        emailMessage.Subject = "Adoption Application Received";
        emailMessage.Body = new TextPart("plain")
        {
            Text = $"Dear {userName},\n\nThank you for your application to adopt the animal with ID: {animalId}.\n\nBest regards,\nPetPath Team"
        };

        using var client = new SmtpClient();
        await client.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(_smtpUser, _smtpPass);
        await client.SendAsync(emailMessage);
        await client.DisconnectAsync(true);
    }


    public async Task SendAcceptance(string userName, string userEmail, string animalName)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("PetPath", _smtpUser));
        emailMessage.To.Add(new MailboxAddress(userName, userEmail));
        emailMessage.Subject = "Next Steps in Your Adoption Process";
        emailMessage.Body = new TextPart("plain")
        {
            Text = $@"Dear {userName},

                        We are excited to inform you that, among the applications we received, you were found to be the best match for the adoption of {animalName}. Based on this, we would like to proceed with further steps to verify some of the details provided in your application.

                        To ensure that {animalName} will be in the best hands, we may need additional information, such as photos of your home environment or a health certificate confirming your ability to provide the required care. Additionally, we might arrange an in-person meeting at our shelter to verify everything in person and to see if {animalName} is comfortable with you.

                        Please note that this is not a final acceptance yet, and {animalName} will not be ready to go home with you immediately. We want to make sure that all aspects are carefully considered before proceeding to the next stage.

                        Feel free to reach out if you have any questions about the process.

                        Thank you for your interest and patience!

                        Best regards,
                        PetPath Team"
        };

        using var client = new SmtpClient();
        await client.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(_smtpUser, _smtpPass);
        await client.SendAsync(emailMessage);
        await client.DisconnectAsync(true);
    }



    public async Task SendRejection(string userName, string userEmail, string animalName)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("PetPath", _smtpUser));
        emailMessage.To.Add(new MailboxAddress(userName, userEmail));
        emailMessage.Subject = "Update Regarding Your Adoption Application";
        emailMessage.Body = new TextPart("plain")
        {
            Text = $@"Dear {userName},

                    Thank you so much for your interest in adopting {animalName} and for taking the time to apply. We truly appreciate your passion and commitment to providing a loving home.

                    At this time, we have identified another applicant who appears to be the best fit for {animalName} based on the information we received. We will be moving forward with them in the next steps of the process.

                    However, this decision is not yet final. If, for any reason, things do not proceed as expected with the current candidate, we may reach out to you again.

                    Thank you once again for your understanding and for opening your heart to adoption. We hope you will continue to consider giving a home to one of the many animals in need.

                    Best regards,
                    PetPath Team"
        };

        using var client = new SmtpClient();
        await client.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(_smtpUser, _smtpPass);
        await client.SendAsync(emailMessage);
        await client.DisconnectAsync(true);
    }








}

