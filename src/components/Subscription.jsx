import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import style from '../styles/Subscription.module.css';

export default function Subscription() {
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState(false);

  const Paddle = window.Paddle;

  // Paddle.Setup({
  //   vendor: process.env.VENDOR_ID,
  // });

  async function handlePayment(e) {
    e.preventDefault();

    Paddle.Checkout.open({
      product: 47216,

      successCallback: (data, err) => {
        console.log(data);
        //ADD YOUR EXTRA LOGIC TO SEND TO BACKEND
        fetch(`${process.env.REACT_APP_API_END_POINT}/payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      },
    });
  }

  if (redirect) {
    return <Navigate to='/create' />;
  }

  return (
    <div className={style.Container} id={style.subscribe}>
      <h3 id={style.callToAction}>
        Don't just read,
        <br /> <span>create your own!</span>
      </h3>
      <div>
        <h2 id={style.title}>14-Day Free Trial</h2>

        <form id={style.subscribeForm} onSubmit={handlePayment}>
          <h3 style={{ fontSize: '1.3rem', textAlign: 'center' }}>
            Subscription
          </h3>
          <hr
            style={{
              width: '20%',
              height: '4px',
              backgroundColor: 'white',
              margin: '0 auto',
            }}
          />
          <h3 style={{ textAlign: 'center', fontSize: '2rem' }}>
            $3.99{' '}
            <span style={{ color: 'grey', fontSize: '1rem' }}>/month</span>
          </h3>
          <ul style={{ margin: '0 auto', listStyle: 'none' }}>
            <li>✓ Unlimited Stories</li>
            <li>✓ Download PDF's</li>
            <li>✓ Publish to Stories</li>
            <li>✓ Cancel Anytime</li>
          </ul>

          <button id={style.subscribeButton}>Subscribe</button>
          <p id={style.errorP}>{alert ? 'Connection Failed' : null}</p>
        </form>
      </div>
    </div>
  );
}
