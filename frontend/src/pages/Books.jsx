import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBooks } from '../features/books/bookSlice';

function Books() {
  const dispatch = useDispatch();
  //const [books, isLoading, isError, isSuccess, message] = useSelector((state) => state.book);
  useEffect(() => {
    // query
    dispatch(getAllBooks());

    return () => {
      // cleaner, plus need to stop query if page changes before previous query stopped running
    };
  }, []);

  const id = 23;
  return (
    <div>
      Book with specific ID <Link to={`${id}`}> Book 23 </Link>
    </div>
  );
}

export default Books;
