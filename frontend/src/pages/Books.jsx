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
      dispatch(reset());
      promise.abort();
    };
  }, [currentPage, dispatch]);

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
        {isError ? (
          <p>Error while loading books.</p>
        ) : (
          <BooksComponent controlsToggle={false} windowSize={windowSize} />
        )}
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
