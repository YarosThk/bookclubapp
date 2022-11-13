import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ValueProposition() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const registerButton = () => {
    navigate('/register');
  };
  return (
    <div className="value-message">
      <h1>Read more, share better</h1>
      <p>Discover, read and share impressions with your peers, everything in a single place.</p>
      {!user && (
        <>
          <button className="btn btn-action" onClick={registerButton}>
            <FaUser />
            Register
          </button>
          <Link to="/login">Already have an account? Log in</Link>
        </>
      )}
    </div>
  );
}

export default ValueProposition;
