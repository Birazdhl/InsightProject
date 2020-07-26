using System;
using System.Collections.Generic;
using System.Text;
//using MailKit.Net.Smtp;
//using MailKit;
//using MimeKit;

using System.Net;
using System.Net.Mail;
using Application.Interface;
using Application.User;
using Microsoft.AspNetCore.Identity;
using Application.Result;
using System.Threading.Tasks;
using Domain;
using Application.ViewModel;

namespace Application.Repo
{
    public class SendEmail
    {
  

        public void SendMail(SendEmailViewModel email)
        {

            var fromAddress = new MailAddress("usermail@gmail.com", "Biraz Dahal"); // use gmail
            var toAddress = new MailAddress(email.requestorEmail, email.requestorName);
            const string fromPassword = "pa$$w0rd"; // use password
            string subject = email.subject;
            string body = email.Message;

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
                Timeout = 20000
            };

            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }
        
    }

}
