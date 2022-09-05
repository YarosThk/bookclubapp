import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';

function Login() {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted');
  };
  const onChange = () => {
    console.log('Changing');
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
              value={'email'}
              placeholder="example@gmail.com"
              onChange={onChange}
            />
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={'password'}
              placeholder="Secure password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
