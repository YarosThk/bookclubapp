import React from 'react';
import { Link } from 'react-router-dom';

function BookItemMobile({ book, controlsToggle, navigateToEditPage, toggleModal, summarize }) {
  return (
    <section className="book" key={book._id}>
      <div className="content-heading">
        <div className="left-wrapper">
          <Link to={`/books/${book._id}`}>
            <h2> {book.title} </h2>
          </Link>
          <p> {book.author} </p>
        </div>
      </div>
      <div className="book-info-section">
        <img
          className="book-cover"
          src={book.cover ? `/uploads/${book.cover}` : '/uploads/Bookplaceholder.png'}
          alt={'bookPlaceholder'}
        />
        <p> {summarize ? summarize(book.description, 160) : book.description} </p>
      </div>
      {controlsToggle ? (
        <div className="right-wrapper">
          <button className="btn comment-btn" onClick={() => navigateToEditPage(book._id)}>
            Edit
          </button>
          <button className="btn comment-btn" onClick={() => toggleModal(book._id)}>
            Delete
          </button>
        </div>
      ) : null}
    </section>
  );
}

export default BookItemMobile;
