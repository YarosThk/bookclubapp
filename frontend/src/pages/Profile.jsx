import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function Profile({ windowSize }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    return () => {
      // no resets for now
    };
  }, [user, navigate, dispatch]);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <div className="controls-header">
          <ul>
            {user.role === 'admin' ? (
              <>
                <li>
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? 'control-element active' : 'control-element'
                    }
                    to="new-book"
                  >
                    New Book
                  </NavLink>
                </li>
                |
                <li>
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? 'control-element active' : 'control-element'
                    }
                    to="books"
                  >
                    Books
                  </NavLink>
                </li>
                |
              </>
            ) : null}
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? 'control-element active' : 'control-element'
                }
                to="comments"
              >
                Comments
              </NavLink>
            </li>
          </ul>
        </div>
      </section>

      <section className="content">
        <Outlet context={{ windowSize }} />
      </section>
    </>
  );
}

export default Profile;
