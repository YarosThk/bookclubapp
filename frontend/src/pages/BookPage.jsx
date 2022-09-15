import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificBook, reset } from '../features/books/bookSlice';
import { getAllBookComments, resetComments } from '../features/comments/commentsSlice';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import Bookplaceholder from './Bookplaceholder.png';

function BookPage() {
  const { comments, paginationComments, isErrorComments, isLoadingComments } = useSelector(
    (state) => state.comment
  );
  const { books, isError, isLoading } = useSelector((state) => state.book);
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate('/not-found');
    }
    const commentPromise = dispatch(getAllBookComments(bookId));
    const bookPromise = dispatch(getSpecificBook(bookId));

    return () => {
      dispatch(reset());
      bookPromise.abort();
      commentPromise.abort();
    };
  }, [bookId, dispatch, navigate, isError]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="posts">
        {books.map((book) => (
          <section key={`${book._id}`} className="book">
            <img src={Bookplaceholder} alt={'bookPlaceholder'} />
            <div className="bookInfoSection">
              <h2 className="bookTitle"> {book.title} </h2>
              <p className="bookTitle"> {book.author} </p>
            </div>
          </section>
        ))}
        <div className="comments">
          {comments.map((comment) => (
            <div key={comment._id} className="comment">
              {comment.commentBody}
            </div>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={paginationComments.page}
        totalPages={paginationComments.totalPages}
      />
    </>
  );
}

export default BookPage;
