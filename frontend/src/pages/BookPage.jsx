import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificBook, reset } from '../features/books/bookSlice';
import { getAllBookComments, resetComments } from '../features/comments/commentsSlice';
import BookItem from '../components/BooksComponents/BookItem';
import CommentForm from '../components/CommentForm';
import Loader from '../components/Loader';
import PageComponent from '../components/PageComponent';
import CommentsComponent from '../components/CommentsComponent';
import BookItemMobile from '../components/BooksComponents/BookItemMobile';

function BookPage({ windowSize }) {
  const { books, isError, isLoading } = useSelector((state) => state.book);
  const {
    paginationComments,
    isErrorComments,
    messageComments,
    isLoadingComments,
    isSuccessComments,
  } = useSelector((state) => state.comment);
  const { bookId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      //example: book with such id not found
      navigate('/not-found');
    }
    const bookPromise = dispatch(getSpecificBook(bookId));
    const commentPromise = dispatch(
      getAllBookComments({ bookId: bookId, currentPage }) //need to replace the hard coded bookId
    );

    return () => {
      dispatch(resetComments());
      dispatch(reset());
      bookPromise.abort();
      commentPromise.abort();
    };
  }, [bookId, dispatch, navigate, isError, currentPage]);

  const AdaptiveBookItem = (book) => {
    if (windowSize > 600) {
      return <BookItem book={book} controlsToggle={false} />;
    } else {
      return <BookItemMobile book={book} controlsToggle={false} />;
    }
  };

  if (isLoading || isLoadingComments) {
    return <Loader />;
  }

  if (isSuccessComments & (messageComments !== '')) {
    toast.success(messageComments);
  }

  if (isErrorComments) {
    toast.error('Error loading comments');
  }
  return (
    <>
      <ToastContainer />
      <div className="books">
        {books[0] && AdaptiveBookItem(books[0])}
        <CommentForm bookId={bookId} />
        {isErrorComments ? <p>{messageComments}</p> : <CommentsComponent />}
      </div>
      <PageComponent
        paginationObject={paginationComments}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default BookPage;
