using System;
using Microsoft.EntityFrameworkCore;

namespace dotnet_tp_test.Models
{
    public class TestContext : DbContext
    {
        public TestContext(DbContextOptions<TestContext> options)
             : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}

