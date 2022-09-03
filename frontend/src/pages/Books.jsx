import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, getAllBooks } from '../features/books/bookSlice';

function Books() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { books, isLoading, isError, message } = useSelector((state) => state.book);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // query
    const promise = dispatch(getAllBooks(page));

    return () => {
      // clean up using .abot() form asyncThunk.
      // Also need to add AbortSignal in case of costly requests.
      console.log('Calling cleanup');
      dispatch(reset());
      promise.abort(); // stop clean up a request, this will emit rejected
    };
  }, [isError, page, dispatch, message]);

  return (
    <div>
      {books.map((book) => (
        <p key={`${book._id}`}>
          <Link to={`${book._id}`}> {book.title} </Link>
        </p>
      ))}
      <button onClick={() => setPage(2)}> Page 2 </button>
    </div>
  );
}

export default Books;
