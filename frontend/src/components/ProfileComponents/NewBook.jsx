import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook, reset } from '../../features/books/bookSlice';
import Loader from '../Loader';
import BookForm from '../BooksComponents/BookForm';

function NewBook() {
  const [newBookData, setNewBookData] = useState({
    title: '',
    author: '',
    description: '',
    bookCover: '',
  });
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError, message, dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  //   if (isSuccess) {
  //     toast.success('Book uploaded');
  //   }
  return (
    <>
      <ToastContainer />
      <BookForm bookData={newBookData} setBookData={setNewBookData} submitFunction={createBook} />
    </>
  );
}

export default NewBook;
