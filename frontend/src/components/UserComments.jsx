import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserComments, resetComments } from '../features/comments/commentsSlice';
import PageComponent from './PageComponent';
import CommentComponent from '../components/CommentComponent';
import Loader from './Loader';

function UserComments() {
  const { user } = useSelector((state) => state.auth);
  const { paginationComments, isErrorComments, isLoadingComments } = useSelector(
    (state) => state.comment
  );
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const userCommentsPromise = dispatch(
      getAllUserComments({ userId: user._id, page: currentPage })
    );
    return () => {
      userCommentsPromise.abort();
      dispatch(resetComments());
    };
  }, [currentPage, dispatch, user]);

  if (isLoadingComments) {
    return <Loader />;
  }

  return (
    <>
      {isErrorComments ? <p>Error while loading comments.</p> : <CommentComponent />}
      <PageComponent
        paginationObject={paginationComments}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default UserComments;
