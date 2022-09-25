import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, reset } from '../features/auth/authSlice';
import { FaSignInAlt } from 'react-icons/fa';
import Loader from '../components/Loader';

function Login() {
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginCredentials;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const onChange = (e) => {
    setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login{' '}
        </h1>
        <p>Login credentials</p>
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
              required={true}
              placeholder="example@gmail.com"
              onChange={onChange}
            />
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              required={true}
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
