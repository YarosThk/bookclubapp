import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserComments, resetComments } from '../features/comments/commentsSlice';
import PageComponent from './PageComponent';
import Loader from './Loader';

function UserComments() {
  const { user } = useSelector((state) => state.auth);
  const { comments, paginationComments, isErrorComments, isLoadingComments } = useSelector(
    (state) => state.comment
  );
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
      <div>User comments go here:</div>
      {isErrorComments ? (
        <p>Error while loading comments.</p>
      ) : (
        <div className="comments">
          {comments.map((comment) => (
            <div key={comment._id} className="comment">
              {comment.commentBody}
            </div>
          ))}
        </div>
      )}
      <PageComponent
        paginationObject={paginationComments}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </>
  );
}

export default UserComments;
