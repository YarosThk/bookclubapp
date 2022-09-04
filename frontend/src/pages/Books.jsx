import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, getAllBooks } from '../features/books/bookSlice';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

function Books() {
  const search = useLocation().search;
  const page = new URLSearchParams(search).get('page');
  const dispatch = useDispatch();
  const { books, isLoading, isError, message, pagination } = useSelector((state) => state.book);

  useEffect(() => {
    // query
    const promise = dispatch(getAllBooks(page));

    return () => {
      // Also can add AbortSignal in case of costly requests.
      // clean up using .abot() form asyncThunk. Will emit rejected in the thunk
      dispatch(reset());
      promise.abort();
    };
  }, [page, dispatch]);

  if (isError) {
    toast.error(message);
    return (
      <div>
        <ToastContainer />
        <h2>An error occurred</h2>
      </div>
    );
  }
  return (
    <>
      <div>
        {isLoading && <Loader />}
        {books.map((book) => (
          <p key={`${book._id}`}>
            <Link to={`${book._id}`}> {book.title} </Link>
          </p>
        ))}
      </div>
      <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} />
    </>
  );
}

export default Books;
