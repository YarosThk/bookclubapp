import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

function BookForm({ formTitle, bookId, bookData, setBookData, submitFunction }) {
  const { title, author, description, bookCover } = bookData;
  const [isValid, setIsValid] = useState(false);
  const [validationError, setValidationError] = useState('');
  const location = useLocation().pathname.split('/').at(-1);
  const isCoverRequiered = location === 'edit' ? false : true;
  const dispatch = useDispatch();

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
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('bookCover', bookCover);

    if (isCoverRequiered) {
      if (isValid) {
        dispatch(submitFunction({ bookId, bookData: formData }));
      }
    } else {
      dispatch(submitFunction({ bookId, bookData: formData }));
    }
    setBookData({
      title: '',
      author: '',
      description: '',
      bookCover: '',
    });
  };

  const onChange = (e) => {
    setBookData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, //e.target.name let's us refere for the name attribute of the field
    }));
  };

  const onChangeCover = (e) => {
    validateSelectedFile(e.target.files[0]);
    setBookData((prevState) => ({
      ...prevState,
      bookCover: e.target.files[0], //e.target.name let's us refere for the name attribute of the field
    }));
  };

  return (
    <>
      <section className="heading">
        <p>{formTitle}</p>
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
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={description}
              required={true}
              maxLength="350"
              placeholder="Book description"
              onChange={onChange}
            >
              {' '}
            </textarea>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .webp"
              className="form-control"
              id="bookCover"
              name="bookCover"
              required={isCoverRequiered}
              placeholder="Book cover"
              onChange={onChangeCover}
            />
            <p className="info-message">Max size: 5MB</p>
            <p className="info-message">{validationError}</p>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-action">
              Upload
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default BookForm;
