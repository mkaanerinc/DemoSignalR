using System.ComponentModel.DataAnnotations;

namespace SignalRSampleProject.Web.Models.ViewModels;

public record SignInViewModel([Required] string Email, [Required] string Password);
