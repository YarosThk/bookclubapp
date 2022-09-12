import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpecificBook, reset } from '../features/books/bookSlice';
import Loader from '../components/Loader';
import Bookplaceholder from './Bookplaceholder.png';

function BookPage() {
  const { books, isError, message, isSuccess, isLoading } = useSelector((state) => state.book);
  const { bookId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const promise = dispatch(getSpecificBook(bookId));

    return () => {
      console.log('running dispatch reset inside book page');
      dispatch(reset());
      promise.abort();
    };
  }, [bookId, dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="posts">
        {books.map((book) => (
          <section key={`${book._id}`} className="book">
            <img src={Bookplaceholder} alt={'bookPlaceholder'} />
            <div className="bookInfoSection">
              <h2 className="bookTitle"> {book.title} </h2>
              <p className="bookTitle"> {book.author} </p>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

export default BookPage;
