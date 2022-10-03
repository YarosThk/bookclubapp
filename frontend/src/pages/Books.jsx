import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, getAllBooks } from '../features/books/bookSlice';
import Loader from '../components/Loader';
import PageComponent from '../components/PageComponent';
import Bookplaceholder from './Bookplaceholder.png';

function Books() {
  // const search = useLocation().search;
  // const page = new URLSearchParams(search).get('page');
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { books, isLoading, isError, pagination } = useSelector((state) => state.book);

  useEffect(() => {
    // query
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
      <div className="posts">
        {books.map((book) => (
          <section key={`${book._id}`} className="book">
            <img src={Bookplaceholder} alt={'bookPlaceholder'} />
            <div className="bookInfoSection">
              <Link to={`${book._id}`}>
                <h2 className="bookTitle"> {book.title} </h2>
              </Link>
              <p className="bookTitle"> {book.author} </p>
            </div>
          </section>
        ))}
        <PageComponent
          paginationObject={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default Books;
