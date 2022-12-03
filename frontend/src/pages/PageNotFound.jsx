import { Link } from 'react-router-dom';
function PageNotFound({ message }) {
  return (
    <>
      <h2>Resource not found</h2>
      {message && <p>{message}</p>}
      <Link to="/">Go Home</Link>
    </>
  );
}

export default PageNotFound;
