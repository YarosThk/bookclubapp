import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCommentById, updateComment, resetComments } from '../features/comments/commentsSlice';
import CommentForm from '../components/CommentsComponents/CommentForm';
import Loader from '../components/Loader';
import PageNotFound from './PageNotFound';

function EditComment() {
  const { comments, isErrorComments, isLoadingComments, messageComments } = useSelector(
    (state) => state.comment
  );
  const { commentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitAction = (text, commentId) => {
    dispatch(updateComment({ text, commentId }));
  };

  useEffect(() => {
    const commentPromise = dispatch(getCommentById(commentId));

    return () => {
      dispatch(resetComments());
      commentPromise.abort();
    };
  }, [commentId, navigate, dispatch]);

  if (isErrorComments) {
    return <PageNotFound message={messageComments} />;
  }

  if (isLoadingComments) {
    return <Loader />;
  }

  return (
    <section className="comments">
      <ToastContainer />
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="content-heading">
            <div className="left-wrapper">
              <h3>{comment.userName}</h3>
            </div>
            <div className="right-wrapper">
              <p>{comment.createdAt.substring(0, 10)}</p>
            </div>
          </div>

          <Link to={`/books/${comment.bookId}`} className="comment-body">
            {comment.commentBody}
          </Link>
        </div>
      ))}
      <CommentForm objectId={commentId} submitAction={submitAction} />
    </section>
  );
}

export default EditComment;
