using Application.Result;
using Application.ViewModel;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repo
{
    public interface IBookRepository
    {
        Task<List<BooksViewModel>> GetBookList();
        Task<AccountResult> CreateBook(string bookName);
        Task<AccountResult> DeleteBook(int id);
        Task<List<Books>> GetBooks();
        Task<Books> GetBookById(int id);
        Task<AccountResult> UpdateBook(BookNameandIdViewModel bookAndIdViewModel);

    }
}
