import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import style from '../styles/LoginRegister.module.css';
import Spinner from '../components/Spinner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [spinner, setSpinner] = useState(false);

  async function login(e) {
    e.preventDefault();
    setSpinner(true);

    const response = await fetch(
      `${process.env.REACT_APP_API_END_POINT}/login`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      setSpinner(false);
      setAlert(true);
    }
    setSpinner(false);
  }

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <div className={style.auth}>
      <h1 id={style.loginTitle}>Login</h1>
      <form id={style.loginForm} onSubmit={login}>
        <input
          className={style.loginInput}
          required
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={style.loginInput}
          required
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id={style.loginButton}>
          {spinner ? <Spinner /> : 'Login'}
        </button>
        <p id={style.errorP}>{alert ? 'Incorrect email or password' : null}</p>
        <span id={style.loginSpan}>
          Don't you have an account?
          <Link to='/register' id={style.loginA}>
            Register
          </Link>
        </span>
        <Link to='/' id={style.homeLink}>
          <span>Back to Homepage</span>
        </Link>
      </form>
    </div>
  );
}
