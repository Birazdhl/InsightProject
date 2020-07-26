using Application.Configuration;
using Application.Errors;
using Application.Result;
using Application.ViewModel;
using Dapper;
using Domain;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repo
{
    public class BookRepository : IBookRepository
    {
        private readonly DataContext _dataContext;
        //public IDbConnection db = new SqlConnection(ConfigurationConnection.connectionString);

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(ConfigurationConnection.connectionString);
            }
        }

        public BookRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<List<BooksViewModel>> GetBookList()
        {
            List<BooksViewModel> bookList = new List<BooksViewModel>();
            SendEmail newMail = new SendEmail();
            SendEmailViewModel emailViewModel = new SendEmailViewModel()
            {
                subject = "Book Submission Deadline Over",
            };

            using (IDbConnection conn = Connection)
            {
                string query = (@" select Books.Id,bookName, AspNetUsers.UserName as 'Name', AspNetUsers.Email as 'Email', anu.userName as 'requestedBy',anu.Id as 'requestedId', anu.Email as 'requestedEmail', issuedOn, returnDate,isAvailable,isTaken, isRequested
                                    from Books 
                                    left join AspNetUsers on Books.issuedBy = AspNetUsers.ID
                                    Left join AspNetUsers anu on Books.requestedBy = anu.ID ");
                conn.Open();
                var results = await conn.QueryAsync<BooksViewModel>(query);

                foreach (var result in results) 
                {
                    if (DateTime.Now > result.returnDate)
                    {
                        emailViewModel.requestorName = result.Name;
                        emailViewModel.requestorEmail = result.Email;
                        emailViewModel.Message = emailViewModel.requestorName + ", \n The deadline for the book has exceeded. Please return the book on time ";

                        newMail.SendMail(emailViewModel);
                    }
                }

                return results.ToList();

            }
        }

        public async Task<AccountResult> CreateBook(string bookName)
        {
            var resultMessage = new AccountResult();
            var book = new Books
            {
                bookName = bookName,
                issuedOn = null,
                returnDate = null,
                issuedBy = null,
                isRequested = false,
                isAvailable = true,
                isTaken = false,
                requestedBy = null

            };
            _dataContext.Books.Add(book);
            await _dataContext.SaveChangesAsync();


            return resultMessage;

        }

        public async Task<AccountResult> DeleteBook(int id)
        {

            var resultMessage = new AccountResult();

            var book = await _dataContext.Books.FindAsync(id);

            if (book == null)
                throw new RestException(HttpStatusCode.NotFound, new { book = "Book Not Found" });

            _dataContext.Remove(book);

            var success = _dataContext.SaveChanges() > 0;

            if (success)
                return resultMessage;

            throw new Exception("Problem Saving Changes");
        }

        public async Task<List<Books>> GetBooks()
        {
            var result = await _dataContext.Books.ToListAsync();
            return result;
        }

        public async Task<Books> GetBookById(int id)
        {
            var book = await _dataContext.Books.FindAsync(id);

            if (book == null)
                throw new RestException(HttpStatusCode.NotFound, new { book = "Book Not Found" });

            return book;
        }

        public async Task<AccountResult> UpdateBook(BookNameandIdViewModel bookAndIdViewModel)
        {
            var resultMessage = new AccountResult();

            var oldBook = await _dataContext.Books.FindAsync(bookAndIdViewModel.Id);
            if (oldBook != null)
            {
                oldBook.bookName = bookAndIdViewModel.bookName ?? oldBook.bookName;
               
            }

            var success = _dataContext.SaveChanges() > 0;

            if (success)
                return resultMessage;

            throw new Exception("Problem Saving Changes");


        }

    }
}
