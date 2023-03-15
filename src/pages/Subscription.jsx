import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import style from '../styles/LoginRegister.module.css';

export default function Subscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState(false);

  const Paddle = window.Paddle;

  async function handlePayment(e) {
    e.preventDefault();
    if (email.length > 0) {
      Paddle.Checkout.open({
        product: 47216,
        email: email,
        successCallback: (data, err) => {
          console.log(data);
          //ADD YOUR EXTRA LOGIC TO SEND TO BACKEND
          fetch(`${process.env.REACT_APP_API_END_POINT}/payment`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(email),
          });
        },
      });
    } else {
      alert('Please enter an Email Address');
    }
  }

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <div className={style.auth}>
      <h1 id={style.loginTitle}>Subscription</h1>
      <form id={style.loginForm} onSubmit={handlePayment}>
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
        <button id={style.loginButton}>Login</button>
        <p id={style.errorP}>{alert ? 'Incorrect email or password' : null}</p>
        <span id={style.loginSpan}>
          Don't you have an account?
          <Link to='/register' id={style.loginA}>
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}
