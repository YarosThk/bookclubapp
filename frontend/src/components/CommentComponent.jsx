import { deleteComment } from '../features/comments/commentsSlice';
import { useDispatch, useSelector } from 'react-redux';

function CommentComponent() {
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
  };
  return (
    <section className="comments">
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="comment-heading">
            <div className="left-wrapper">
              <h3>{comment.userName}</h3>
            </div>
            <div className="right-wrapper">
              <p>{comment.createdAt.substring(0, 10)}</p>
              <select name="controls" id="controls">
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
              </select>
            </div>
          </div>
          <p>{comment.commentBody}</p>
          {comment.userId === user._id ? (
            <button className="btn" onClick={() => handleDelete(comment._id)}>
              Delete
            </button>
          ) : null}
        </div>
      ))}
    </section>
  );
}

export default CommentComponent;
