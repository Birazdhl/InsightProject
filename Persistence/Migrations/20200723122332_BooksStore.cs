using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class BooksStore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    bookName = table.Column<string>(nullable: true),
                    issuedOn = table.Column<DateTime>(nullable: true),
                    returnDate = table.Column<DateTime>(nullable: true),
                    isReturned = table.Column<bool>(nullable: false),
                    issuedBy = table.Column<Guid>(nullable: true),
                    isRequested = table.Column<bool>(nullable: false),
                    isAvailable = table.Column<bool>(nullable: false),
                    isTaken = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");
        }
    }
}
