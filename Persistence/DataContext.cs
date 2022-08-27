using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    /// <summary>
    /// The DataContext class is the main class that is used to interact with the database.
    /// Using IdentityDbContext will scaffold the database and create the tables for the identity framework.
    /// IdentityDbContext is a speical for of DbContext that is used for identity.
    /// </summary>
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
    }
}