import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook, reset } from '../features/books/bookSlice';
import Loader from '../components/Loader';

function BookForm() {
  const [registrationForm, setRegistrationForm] = useState({
    title: '',
    author: '',
    description: '',
    bookCover: '',
  });
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.book);
  const { title, author, description, bookCover } = registrationForm;
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success('Book uploaded');
    }
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError, message, dispatch]);

  const validateSelectedFile = (cover) => {
    const MAX_FILE_SIZE = 5120; // 5MB

    const fileSizeKiloBytes = cover.size / 1024;

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setValidationError('File size is greater than maximum limit');
      setIsValid(false);
      return;
    }

    setValidationError('');
    setIsValid(true);
  };

  const onSubmit = (e) => {
    if (isValid) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('description', description);
      formData.append('bookCover', bookCover);
      dispatch(createBook(formData));
    }
  };

  const onChange = (e) => {
    setRegistrationForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, //e.target.name let's us refere for the name attribute of the field
    }));
  };

  const onChangeCover = (e) => {
    validateSelectedFile(e.target.files[0]);
    setRegistrationForm((prevState) => ({
      ...prevState,
      bookCover: e.target.files[0], //e.target.name let's us refere for the name attribute of the field
    }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <section className="heading">
        <p>Book form</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              // required={true}
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
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={description}
              required={true}
              placeholder="Book description"
              onChange={onChange}
            >
              {' '}
            </textarea>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              className="form-control"
              id="bookCover"
              name="bookCover"
              required={true}
              placeholder="Book cover"
              onChange={onChangeCover}
            />
            <p className="info-message">Max size: 5MB</p>
            <p className="info-message">{validationError}</p>
          </div>
          <div className="form-group">
            <button type="submit" className="btn" disabled={isValid ? false : true}>
              {' '}
              Upload{' '}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default BookForm;
