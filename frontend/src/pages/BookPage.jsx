import { useParams } from 'react-router-dom';

function BookPage() {
  const params = useParams();
  return <div>Book page with ID: {params.bookId}</div>;
}

export default BookPage;
