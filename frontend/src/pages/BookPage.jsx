import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificBook, reset } from '../features/books/bookSlice';
import { getAllBookComments, resetComments } from '../features/comments/commentsSlice';
import CommentForm from '../components/CommentForm';
import Loader from '../components/Loader';
import PageComponent from '../components/PageComponent';
import CommentsComponent from '../components/CommentsComponent';
import AdaptiveBookItem from '../components/BooksComponents/AdaptiveBookItem';

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
        {books[0] && <AdaptiveBookItem book={books[0]} windowSize={windowSize} />}
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
