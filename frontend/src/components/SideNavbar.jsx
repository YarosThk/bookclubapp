import { FaSignInAlt, FaSignOutAlt, FaUser, FaBook, FaHome, FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { logoutUser, reset } from '../features/auth/authSlice';
import useComponentVisible from './useComponentVisible';

function SideNavbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const toggleSidebar = () => setIsComponentVisible(!isComponentVisible);

  const onLogout = () => {
    toggleSidebar();
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/"> BookClubApp</Link>
        </div>
        <Link to="#">
          <FaBars
            onClick={toggleSidebar}
            className={isComponentVisible ? 'menu-bars inactive' : 'menu-bars'}
          />
        </Link>
      </div>
      <div ref={ref} className={isComponentVisible ? 'nav-menu active' : 'nav-menu'}>
        <div className="navbar-toggle">
          <Link to="#" className="menu-bars">
            <AiOutlineClose onClick={toggleSidebar} />
          </Link>
        </div>
        <ul>
          <li>
            <NavLink
              className={(navData) =>
                navData.isActive ? 'control-element active' : 'control-element'
              }
              onClick={toggleSidebar}
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
              onClick={toggleSidebar}
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
                  onClick={toggleSidebar}
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
      </div>
    </>
  );
}

export default SideNavbar;
