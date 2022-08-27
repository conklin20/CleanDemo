using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        [DisplayName("Display Name")]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be 4 to 8 characters and contain at least one uppercase letter, one lowercase letter and one number.")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
    }
}