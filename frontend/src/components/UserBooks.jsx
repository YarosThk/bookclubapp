import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooksByUser, reset } from '../features/books/bookSlice';
import PageComponent from './PageComponent';
import Loader from './Loader';

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
              <img
                src={book.cover ? `/uploads/${book.cover}` : '/uploads/Bookplaceholder.png'}
                alt={'bookPlaceholder'}
              />
              <div className="bookInfoSection">
                <div className="content-heading">
                  <div className="left-wrapper">
                    <Link to={`/books/${book._id}`}>
                      <h2> {book.title} </h2>
                    </Link>
                  </div>
                  <div className="right-wrapper">
                    <button className="comment-btn">Delete</button>
                  </div>
                </div>
                <p> {book.author} </p>
                <p> {book.description} </p>
              </div>
            </section>
          ))}
        </div>
      )}
      <PageComponent
        paginationObject={pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default UserBooks;
