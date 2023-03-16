import React from 'react';
import Subscription from '../components/Subscription';
import style from '../styles/Subscription.module.css';

export default function SubscriptionPage() {
  return (
    <div id={style.subscriptionWrapper}>
      <Subscription />
    </div>
  );
}
