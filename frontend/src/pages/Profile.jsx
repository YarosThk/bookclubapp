import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Profile() {
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
                  <Link to="new-book"> New Book </Link>
                </li>
                |
                <li>
                  <Link to="books"> Books</Link>
                </li>
                |
              </>
            ) : null}
            <li>
              <Link to="comments"> Comments </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="content">
        <Outlet />
      </section>
    </>
  );
}

export default Profile;
