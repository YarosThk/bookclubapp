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

function BookPage() {
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
        {books.map((book) => (
          <section key={`${book._id}`} className="book">
            <img
              src={book.cover ? `/uploads/${book.cover}` : '/uploads/Bookplaceholder.png'}
              alt={'bookPlaceholder'}
            />
            <div className="bookInfoSection">
              <h2 className="bookTitle"> {book.title} </h2>
              <p className="bookTitle"> {book.author} </p>
            </div>
          </section>
        ))}
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
