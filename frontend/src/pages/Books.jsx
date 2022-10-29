import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, getAllBooks } from '../features/books/bookSlice';
import Loader from '../components/Loader';
import BooksComponent from '../components/BooksComponents/BooksComponent';
import PageComponent from '../components/PageComponent';

function Books({ windowSize }) {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { isLoading, isError, pagination } = useSelector((state) => state.book);

  useEffect(() => {
    const promise = dispatch(getAllBooks(currentPage));

    return () => {
      // Also can add AbortSignal in case of costly requests.
      // clean up using .abort() from asyncThunk. Will emit rejected in the thunk
      dispatch(reset());
      promise.abort();
    };
  }, [currentPage, dispatch]);

  if (isError) {
    return (
      <div>
        <h2>An error occurred</h2>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageComponent
        paginationObject={pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="books">
        <BooksComponent controlsToggle={false} windowSize={windowSize} />
      </div>
      <PageComponent
        paginationObject={pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default Books;
