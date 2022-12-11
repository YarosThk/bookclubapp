import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificBook, reset } from '../features/books/bookSlice';
import {
  createComment,
  getAllBookComments,
  resetComments,
} from '../features/comments/commentsSlice';
import PageNotFound from './PageNotFound';
import CommentForm from '../components/CommentsComponents/CommentForm';
import Loader from '../components/Loader';
import PageComponent from '../components/PageComponent';
import CommentsComponent from '../components/CommentsComponents/CommentsComponent';
import AdaptiveBookItem from '../components/BooksComponents/AdaptiveBookItem';

function BookPage({ windowSize }) {
  const { books, isError, isLoading, message } = useSelector((state) => state.book);
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

  const submitAction = (text, bookId) => {
    dispatch(createComment({ text, bookId }));
  };

  useEffect(() => {
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
  }, [bookId, dispatch, navigate, currentPage]);

  if (isError) {
    return <PageNotFound message={message} />;
  }

  if (isLoading || isLoadingComments) {
    return <Loader />;
  }

  if (isSuccessComments & (messageComments !== '')) {
    //Sucess message when publishing comments
    // Need another implementation
    toast.success(messageComments);
  }

  return (
    <>
      <ToastContainer />
      <div className="books">
        {books[0] && <AdaptiveBookItem book={books[0]} windowSize={windowSize} />}
        <CommentForm objectId={bookId} submitAction={submitAction} />
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
