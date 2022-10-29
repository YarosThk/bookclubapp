import { deleteBook } from '../../features/books/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BookItem from './BookItem';
import BookItemMobile from './BookItemMobile';

function BooksComponent({ controlsToggle, windowSize }) {
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
      {books.map((book) =>
        windowSize > 600 ? (
          <BookItem
            key={book._id}
            book={book}
            controlsToggle={controlsToggle}
            handleDelete={handleDelete}
            navigateToEditPage={navigateToEditPage}
            summarize={summarize}
          />
        ) : (
          <BookItemMobile
            key={book._id}
            book={book}
            controlsToggle={controlsToggle}
            handleDelete={handleDelete}
            navigateToEditPage={navigateToEditPage}
            summarize={summarize}
          />
        )
      )}
    </div>
  );
}

export default BooksComponent;
