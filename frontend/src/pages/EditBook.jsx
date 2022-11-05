import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificBook, updateBook, reset } from '../features/books/bookSlice';
import BookForm from '../components/BooksComponents/BookForm';
import Loader from '../components/Loader';

function EditBook() {
  const { books, isError, isLoading } = useSelector((state) => state.book);
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
    if (isError) {
      navigate('/not-found');
    }

    const bookPromise = dispatch(getSpecificBook(bookId));

    return () => {
      dispatch(reset());
      bookPromise.abort();
    };
  }, [bookId, dispatch, navigate, isError]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="content">
      <ToastContainer />
      <div className="books">
        {books[0] && (
          <section key={`${books[0]._id}`} className="book">
            <img
              src={books[0].cover ? `/uploads/${books[0].cover}` : '/uploads/Bookplaceholder.png'}
              alt={'bookPlaceholder'}
            />
            <div className="book-info-section">
              <div className="content-heading">
                <div className="leaft-wrapper">
                  <h2 className="bookTitle"> {books[0].title} </h2>
                  <p className="bookTitle"> {books[0].author} </p>
                </div>
              </div>
              <p> {books[0].description} </p>
            </div>
          </section>
        )}
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
