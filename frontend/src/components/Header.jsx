import { FaSignInAlt, FaSignOutAlt, FaUser, FaBook, FaHome } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, reset } from '../features/auth/authSlice';

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"> BookClubApp</Link>
      </div>
      <ul>
        <li>
          <Link to="/books">
            <FaBook /> Books
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profile">
                <FaHome /> Profile
              </Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> LogIn
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
