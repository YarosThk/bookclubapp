import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificBook, updateBook, reset } from '../features/books/bookSlice';
import BookForm from '../components/BooksComponents/BookForm';
import Loader from '../components/Loader';
import AdaptiveBookItem from '../components/BooksComponents/AdaptiveBookItem';
import PageNotFound from './PageNotFound';

function EditBook({ windowSize }) {
  const { books, isError, isLoading, message } = useSelector((state) => state.book);
  const [updatedBookData, setUpdatedBookData] = useState({
    title: '',
    author: '',
    description: '',
    bookCover: '',
  });
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const bookPromise = dispatch(getSpecificBook(bookId));

    return () => {
      dispatch(reset());
      bookPromise.abort();
    };
  }, [bookId, dispatch, navigate]);

  if (isError) {
    return <PageNotFound message={message} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="content">
      <ToastContainer />
      <div className="books">
        {books[0] && <AdaptiveBookItem book={books[0]} windowSize={windowSize} />}
      </div>
      <BookForm
        formTitle={'Edit Book'}
        bookId={bookId}
        bookData={updatedBookData}
        setBookData={setUpdatedBookData}
        submitFunction={updateBook}
      />
    </section>
  );
}

export default EditBook;
