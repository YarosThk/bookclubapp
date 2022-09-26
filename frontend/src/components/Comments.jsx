import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserComments, resetComments } from '../features/comments/commentsSlice';

function Comments() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const userCommentsPromise = dispatch(getAllUserComments(user._id));
    return () => {
      userCommentsPromise.abort();
      dispatch(resetComments());
    };
  }, [dispatch, user]);
  return <div>User comments go here</div>;
}

export default Comments;
