import { FaSignInAlt, FaSignOutAlt, FaUser, FaBook, FaHome } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
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
          <NavLink
            className={(navData) =>
              navData.isActive ? 'control-element active' : 'control-element'
            }
            to="/"
            end
          >
            <FaHome /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) =>
              navData.isActive ? 'control-element active' : 'control-element'
            }
            to="/books"
            end
          >
            <FaBook /> Books
          </NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? 'control-element active' : 'control-element'
                }
                to={`/profile/${user._id}`}
              >
                <FaHome /> Profile
              </NavLink>
            </li>
            <li>
              <button className="btn btn-logout" onClick={onLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? 'control-element active' : 'control-element'
                }
                to="/login"
              >
                <FaSignInAlt /> LogIn
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? 'control-element active' : 'control-element'
                }
                to="/register"
              >
                <FaUser /> Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
