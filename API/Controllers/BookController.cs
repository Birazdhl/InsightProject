using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Repo;
using Application.ViewModel;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookController : ControllerBase
    {

        private IBookRepository _bookService;

        public BookController(IBookRepository bookService)
        {
            this._bookService = bookService;
        }

        [HttpGet]
        public async Task<ActionResult<List<BooksViewModel>>> GetBookList()
        {
            var result = await _bookService.GetBookList();
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<List<Books>>> GetBook()
        {
            var result = await _bookService.GetBooks();
            return Ok(result);
        }

        [HttpGet("{book}")]
        public async Task<ActionResult> CreateBook(string book)
        {
            var result = await _bookService.CreateBook(book);
            return Ok(book);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _bookService.DeleteBook(id);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Books>>> GetBookById(int id)
        {
            var result = await _bookService.GetBookById(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> UpdateBook(BookNameandIdViewModel bookViewModel)
        {
            var result = await _bookService.UpdateBook(bookViewModel);
            return Ok(bookViewModel.bookName);
        }

    }
}