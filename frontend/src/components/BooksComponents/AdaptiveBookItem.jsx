import React from 'react';
import BookItem from './BookItem';
import BookItemMobile from './BookItemMobile';

function AdaptiveBookItem({ book, windowSize }) {
  if (windowSize > 600) {
    return <BookItem book={book} controlsToggle={false} />;
  } else {
    return <BookItemMobile book={book} controlsToggle={false} />;
  }
}

export default AdaptiveBookItem;
