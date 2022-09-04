import { FaSignInAlt, FaSignOutAlt, FaUser, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/"> BookClubApp</Link>
      </div>
      <ul>
        <li>
          <Link to="/books/?page=1">
            <FaBook /> Books
          </Link>
        </li>
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
      </ul>
    </header>
  );
}

export default Header;
