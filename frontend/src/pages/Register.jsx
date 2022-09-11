import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, reset } from '../features/auth/authSlice';
import Loader from '../components/Loader';

const Register = () => {
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = registrationForm;
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setRegistrationForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, //e.target.name let's us refere for the name attribute of the field
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(registerUser(userData));
    } else {
      toast.error('Passwords do not match.');
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <ToastContainer />
      <section className="heading">
        <h1>
          <FaUser /> Register{' '}
        </h1>
        <p>Please fill registration data</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
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
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Repeat password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              {' '}
              Submit{' '}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
