import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ValueProposition() {
  return (
    <div className="value-message">
      <h1>Read more, share better</h1>
      <p>Discover, read and share impressions with your peers, everything in a single place.</p>
      <button className="btn btn-logout">
        <FaUser />
        Register
      </button>
      <Link to="/login">Already have an account? Log in</Link>
    </div>
  );
}

export default ValueProposition;
