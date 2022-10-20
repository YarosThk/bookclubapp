import { Link } from 'react-router-dom';
import { deleteBook } from '../../features/books/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function BooksComponent({ controlsToggle }) {
  const { books } = useSelector((state) => state.book);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  const navigateToEditPage = (bookId) => {
    navigate(`/books/${bookId}/edit`);
  };

  const summarize = (text, size) => {
    return text.length > size ? text.slice(0, size - 1) + '…' : text;
  };

  return (
    <div className="books">
      {books.map((book) => (
        <section className="book" key={book._id}>
          <img
            src={book.cover ? `/uploads/${book.cover}` : '/uploads/Bookplaceholder.png'}
            alt={'bookPlaceholder'}
          />
          <div className="book-info-section">
            <div className="content-heading">
              <div className="left-wrapper">
                <Link to={`/books/${book._id}`}>
                  <h2> {book.title} </h2>
                </Link>
              </div>
              <div className="right-wrapper">
                {controlsToggle ? (
                  <>
                    <button className="comment-btn" onClick={() => navigateToEditPage(book._id)}>
                      Edit
                    </button>
                    <button className="comment-btn" onClick={() => handleDelete(book._id)}>
                      Delete
                    </button>
                  </>
                ) : null}
              </div>
            </div>
            <p> {book.author} </p>
            <p> {summarize(book.description, 160)} </p>
          </div>
        </section>
      ))}
    </div>
  );
}

export default BooksComponent;
