import { Link } from 'react-router-dom';

function Books() {
  const id = 23;
  return (
    <div>
      Book with specific ID <Link to={`${id}`}> Book 23 </Link>
    </div>
  );
}

export default Books;
