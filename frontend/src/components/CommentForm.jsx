import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, resetComments } from '../features/comments/commentsSlice';

function CommentForm({ bookId }) {
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    //to prevent submitting leading empty spaces
    let trimmedText = text.trim();
    if (trimmedText !== '') {
      dispatch(createComment({ text, bookId }));
      setText('');
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Comment</label>
          <textarea
            type="text"
            name="text"
            id="text"
            value={user ? text : 'Login to post a comment.'}
            onChange={handleChange}
            required={true}
          >
            {' '}
          </textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit" disabled={user ? false : true}>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default CommentForm;
