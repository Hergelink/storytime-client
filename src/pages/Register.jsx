import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import style from '../styles/LoginRegister.module.css';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setSpinner(true);

    const response = await fetch(
      `${process.env.REACT_APP_API_END_POINT}/register`,
      {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (response.status === 200) {
      setSpinner(false);
      setRedirect(true);
    } else {
      setSpinner(false);
      setAlert('Problem connecting to server');
    }
    setSpinner(false);
  };

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <div className={style.auth}>
      <h1 id={style.registerTitle}>Register</h1>
      <form id={style.registerForm} onSubmit={register}>
        <input
          className={style.registerInput}
          required
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={style.registerInput}
          required
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={style.registerInput}
          required
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id={style.registerButton}>
          {spinner ? <Spinner /> : 'Register'}
        </button>
        {alert ? <p id={style.errorP}>{alert}</p> : null}
        <span id={style.registerSpan}>
          Do you have an account?
          <Link to='/login' id={style.registerA}>
            Login
          </Link>
        </span>
        <Link to='/' id={style.homeLink}>
          <span>Back to Homepage</span>
        </Link>
      </form>
    </div>
  );
}
