import React from 'react';
import style from '../styles/HowtoUse.module.css';
import ideaIcon from '../images/idea-icon.png';
import timeIcon from '../images/time-icon.png';
import bookIcon from '../images/book-icon.png';

export default function HowtoUse() {
  return (
    <section>
      <h2 id={style.howtoTitle}>How does it work?</h2>
      <div id={style.howtoInfoContainer}>
        <div className={style.howtoCard}>
          <img
            className={style.howtoImg}
            src={ideaIcon}
            alt='a cloud with a lightbulb'
          />
          <p className={style.howtoText}>Think about what kind of story you would like</p>
        </div>
        <div className={style.howtoCard}>
          <img
            className={style.howtoImg}
            src={timeIcon}
            alt='a clock indicating the passing of time'
          />
          <p className={style.howtoText}>Press the create button and wait 30 seconds</p>
        </div>
        <div className={style.howtoCard}>
          <img
            className={style.howtoImg}
            src={bookIcon}
            alt='an open book with glitters comming out of it'
          />
          <p className={style.howtoText}>Your personalized story is ready. Enjoy your read!</p>
        </div>
      </div>
    </section>
  );
}
