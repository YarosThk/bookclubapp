import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooksByUser, reset } from '../../features/books/bookSlice';
import BooksComponent from '../BooksComponents/BooksComponent';
import PageComponent from '../PageComponent';
import Loader from '../Loader';

function UserBooks() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, pagination } = useSelector((state) => state.book);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

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
      {isError ? <p>Error while loading books.</p> : <BooksComponent controlsToggle={true} />}
      <PageComponent
        paginationObject={pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default UserBooks;
