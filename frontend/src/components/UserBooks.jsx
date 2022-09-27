import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooksByUser, reset } from '../features/books/bookSlice';
import PageComponent from './PageComponent';
import Loader from './Loader';
import Bookplaceholder from '../pages/Bookplaceholder.png';

function UserBooks() {
  const { user } = useSelector((state) => state.auth);
  const { books, isLoading, isError, pagination, message } = useSelector((state) => state.book);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const handlePageClick = (e) => {
    setCurrentPage(parseInt(e.target.firstChild.textContent));
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const userBooksPromise = dispatch(getBooksByUser({ userId: user._id, page: currentPage }));
    return () => {
      userBooksPromise.abort();
      dispatch(reset());
    };
  }, [user, currentPage, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isError ? (
        message
      ) : (
        <div>
          {books.map((book) => (
            <section className="book" key={book._id}>
              <img src={Bookplaceholder} alt={'bookPlaceholder'} />
              <div className="bookInfoSection">
                <Link to={`${book._id}`}>
                  <h2 className="bookTitle"> {book.title} </h2>
                </Link>
                <p className="bookTitle"> {book.author} </p>
              </div>
            </section>
          ))}
        </div>
      )}
      <PageComponent
        paginationObject={pagination}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </>
  );
}

export default UserBooks;
