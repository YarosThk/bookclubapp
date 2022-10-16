import { deleteComment } from '../features/comments/commentsSlice';
import { useDispatch, useSelector } from 'react-redux';

function CommentsComponent() {
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const handleEdit = (commentId) => {
    console.log('Should edit the comment');
  };

  return (
    <section className="comments">
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="content-heading">
            <div className="left-wrapper">
              <h3>{comment.userName}</h3>
            </div>
            <div className="right-wrapper">
              <p>{comment.createdAt.substring(0, 10)}</p>
              {comment.userId === user._id ? (
                <>
                  <button className="comment-btn" onClick={() => handleEdit(comment._id)}>
                    Edit
                  </button>
                  <button className="comment-btn" onClick={() => handleDelete(comment._id)}>
                    Delete
                  </button>
                </>
              ) : null}
            </div>
          </div>
          <p className="comment-body">{comment.commentBody}</p>
        </div>
      ))}
    </section>
  );
}

export default CommentsComponent;
