import { deleteComment } from '../../features/comments/commentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function CommentsComponent() {
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const handleEdit = (commentId) => {
    navigate(`/comments/${commentId}/edit`);
  };

  return (
    <section className="comments">
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="content-heading">
            <div className="left-wrapper">
              <p>{comment.userName}</p>
              {comment.edited ? <p> &nbsp;-&nbsp;Edited</p> : ''}
            </div>
            <div className="right-wrapper">
              <p>{comment.createdAt.substring(0, 10)}</p>
              {user && comment.userId === user._id ? (
                <>
                  <button className="btn comment-btn" onClick={() => handleEdit(comment._id)}>
                    Edit
                  </button>
                  <button className="btn comment-btn" onClick={() => handleDelete(comment._id)}>
                    Delete
                  </button>
                </>
              ) : null}
            </div>
          </div>
          {/* <p className="comment-body">{comment.commentBody}</p> */}
          <Link to={`/books/${comment.bookId}`} className="comment-body">
            {comment.commentBody}
          </Link>
        </div>
      ))}
    </section>
  );
}

export default CommentsComponent;
