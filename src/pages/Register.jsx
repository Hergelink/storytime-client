import React, { useState } from 'react';
import { Navigate } from 'react-router';
import style from '../styles/LoginRegister.module.css';
import { Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const register = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_API_END_POINT}/register`,
      {
        // const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (response.status === 200) {
      alert('Registration Succesful');
      setRedirect(true);
    } else {
      alert('Registration Failed');
    }
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
        <button id={style.registerButton}>Register</button>
        {/* <p id={style.errorP}>This is an error!</p> */}
        <span id={style.registerSpan}>
          Do you have an account?
          <Link to='/login' id={style.registerA}>
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}
