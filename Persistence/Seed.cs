using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Sugat Paneru",
                        UserName = "gattu",
                        Email = "spaneru@sevadev.com"
                    },
                     new AppUser
                    {
                        DisplayName = "Biraj Dahal",
                        UserName = "birazdhl",
                        Email = "bdahal@sevadev.com"
                    },
                      new AppUser
                    {
                        DisplayName = "admin",
                        UserName = "admin",
                        Email = "admin@admin.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Books.Any())
            {
                var books = new List<Books>
                {
                    new Books
                    {
                        bookName = "Think and Grow Rich",
                        isAvailable = true
                    },
                    new Books
                    {
                        bookName = "Rich Dad Poor Dad",
                        isAvailable = true

                    },
                    new Books
                    {
                        bookName = "Meessi",
                        isAvailable = true

                    },
                    new Books
                    {
                        bookName = "Mocking Bird",
                        isAvailable = true
                    },
                    new Books
                    {
                        bookName = "Summer Love",
                        isAvailable = true
                    },
                    new Books
                    {
                        bookName = "Saaya",
                        isAvailable = true
                    },
                    new Books
                    {
                        bookName = "Dark",
                        isAvailable = true
                    },
                    new Books
                    {
                        bookName = "Elite",
                        isAvailable = true
                    },
                    new Books
                    {
                        bookName = "You Can Win",
                        isAvailable = true
                    }

            };

                context.Books.AddRange(books);
                context.SaveChanges();


            }

        }
    }
}
