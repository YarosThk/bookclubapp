import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificBook, updateBook, reset } from '../features/books/bookSlice';
import BookForm from '../components/BooksComponents/BookForm';
import Loader from '../components/Loader';

function EditBook() {
  const { books, isError, isSuccess, isLoading, message } = useSelector((state) => state.book);
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

  //   if (isSuccess) {
  //     toast.success('Book uploaded');
  //   }

  return (
    <section className="content">
      <ToastContainer />
      <BookForm
        bookData={updatedBookData}
        setBookData={setUpdatedBookData}
        submitFunction={updateBook}
      />
    </section>
  );
}

export default EditBook;
