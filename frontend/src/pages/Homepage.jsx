import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllBookComments, resetComments } from '../features/comments/commentsSlice';

function Homepage() {
  const { comments, isErrorComments, isLoadingComments } = useSelector((state) => state.comment);
  const bookId = '63051c57a4578439050380fb';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isErrorComments) {
      navigate('/not-found');
    }
    const commentPromise = dispatch(getAllBookComments(bookId, 1));

    return () => {
      dispatch(resetComments());
      commentPromise.abort();
    };
  }, [bookId, dispatch, navigate, isErrorComments]);
  return <div>Homepage</div>;
}

export default Homepage;
