using Microsoft.AspNetCore.Mvc;
using ShowcaseAPI.Models;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShowcaseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        // POST api/<MailController>
        [HttpPost]
        public ActionResult Post([Bind("FirstName, LastName, Email, Phone")] Contactform form)
        {
            //Op brightspace staan instructies over hoe je de mailfunctionaliteit werkend kunt maken:
            //Project Web Development > De showcase > Week 2: contactpagina (UC2) > Hoe verstuur je een mail vanuit je webapplicatie met Mailtrap?
            try
            {
                var client = new SmtpClient("sandbox.smtp.mailtrap.io", 2525)
                {
                    Credentials = new NetworkCredential("42f55069816e02", "a38c586cd76afb"),
                    EnableSsl = true
                };

                string emailBody = $"Hallo ik ben {form.FirstName} {form.LastName}, en ik wil graag contact leggen. \n Mijn telefoonnummer is: {form.Phone} en mijn email is {form.Email}";

                client.Send(form.Email, "to@example.com", "Contactverzoek", emailBody);
                Debug.WriteLine("Sent");
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Fout bij verzenden mail: {ex.Message}");
            }
            return Ok();
        }
    }
}
