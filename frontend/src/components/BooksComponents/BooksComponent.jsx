import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteBook } from '../../features/books/bookSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BookItem from './BookItem';
import BookItemMobile from './BookItemMobile';
import DeleteModal from './DeleteModal';

function BooksComponent({ controlsToggle, windowSize }) {
  const { books } = useSelector((state) => state.book);
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleModal = (bookId = '') => {
    if (showModal) {
      setShowModal(false);
      setBookToDelete('');
    } else {
      setShowModal(true);
      setBookToDelete(bookId);
    }
  };

  const handleDelete = () => {
    dispatch(deleteBook(bookToDelete));
  };

  const navigateToEditPage = (bookId) => {
    navigate(`/books/${bookId}/edit`);
  };

  const summarize = (text, size) => {
    return text.length > size ? text.slice(0, size - 1) + '…' : text;
  };

  return (
    <div className="books">
      <DeleteModal visible={showModal} handleDelete={handleDelete} toggleModal={toggleModal} />
      {books.map((book) =>
        windowSize > 600 ? (
          <BookItem
            key={book._id}
            book={book}
            controlsToggle={controlsToggle}
            toggleModal={toggleModal}
            navigateToEditPage={navigateToEditPage}
            summarize={summarize}
          />
        ) : (
          <BookItemMobile
            key={book._id}
            book={book}
            controlsToggle={controlsToggle}
            toggleModal={toggleModal}
            navigateToEditPage={navigateToEditPage}
            summarize={summarize}
          />
        )
      )}
    </div>
  );
}

export default BooksComponent;
