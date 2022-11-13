import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CommentForm({ submitAction, objectId }) {
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    //to prevent submitting leading empty spaces
    let trimmedText = text.trim();
    if (trimmedText !== '') {
      submitAction(text, objectId);
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
            maxLength="500"
            required={true}
          >
            {' '}
          </textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-action" type="submit" disabled={user ? false : true}>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default CommentForm;
