import { useState } from 'react';
import { useDispatch, useNavigate, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { FaSignInAlt } from 'react-icons/fa';

function Login() {
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginCredentials;
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const onChange = (e) => {
    setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login{' '}
        </h1>
        <p>Input login credentials</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={onChange}
            />
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Secure password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
