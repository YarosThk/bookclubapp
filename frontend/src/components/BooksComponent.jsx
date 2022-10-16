import { Link } from 'react-router-dom';
import { deleteBook } from '../features/books/bookSlice';
import { useDispatch, useSelector } from 'react-redux';

function BooksComponent() {
  const { user } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  const handleDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  const handleEdit = (bookId) => {
    console.log('Should edit the book');
  };

  return (
    <div>
      {books.map((book) => (
        <section className="book" key={book._id}>
          <img
            src={book.cover ? `/uploads/${book.cover}` : '/uploads/Bookplaceholder.png'}
            alt={'bookPlaceholder'}
          />
          <div className="bookInfoSection">
            <div className="content-heading">
              <div className="left-wrapper">
                <Link to={`/books/${book._id}`}>
                  <h2> {book.title} </h2>
                </Link>
              </div>
              <div className="right-wrapper">
                {book.user === user._id ? (
                  <>
                    <button className="comment-btn" onClick={() => handleEdit(book._id)}>
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
            <p> {book.description} </p>
          </div>
        </section>
      ))}
    </div>
  );
}

export default BooksComponent;
