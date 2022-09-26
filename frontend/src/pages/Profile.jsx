import { useState, useEffect } from 'react';
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
        <p>Find your activity here: </p>
        <div className="controls-header">
          <ul>
            <li>
              <Link to="books"> Books posted </Link>
            </li>
            <li>
              <Link to="comments"> Comments </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="content">
        <p>Queried data:</p>
        <Outlet />
      </section>
    </>
  );
}

export default Profile;
