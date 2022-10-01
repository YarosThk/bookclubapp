import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';

function BookForm() {
  const [registrationForm, setRegistrationForm] = useState({
    title: '',
    author: '',
    description: '',
    bookCover: '',
  });
  const { title, author, description, bookCover } = registrationForm;
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setRegistrationForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, //e.target.name let's us refere for the name attribute of the field
    }));
  };
  return (
    <>
      <ToastContainer />
      <section className="heading">
        <p>Book form</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              required={true}
              placeholder="Book title"
              onChange={onChange}
            />
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              value={author}
              required={true}
              placeholder="Author"
              onChange={onChange}
            />
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={description}
              required={true}
              placeholder="Book description"
              onChange={onChange}
            />
            <input
              type="file"
              className="form-control"
              id="bookCover"
              name="bookCover"
              value={bookCover}
              required={true}
              placeholder="Book cover"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              {' '}
              Submit{' '}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default BookForm;
