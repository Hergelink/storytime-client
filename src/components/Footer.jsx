import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Footer.module.css';

export default function Footer() {
  const handleScroll = () => {
    const element = document.querySelector('header');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <footer>
      <div id={style.wrapper}>
        <div className={style.footerContainers}>
          <Link
            to='/'
            id={style.footerLogo}
            translate='no'
            onClick={handleScroll}
          >
            StoryTime&trade;
          </Link>
          <p>Create unique stories in seconds.</p>
        </div>
        <div className={style.footerContainers}>
          <h3 className={style.footerTitles}>Links</h3>
          <div id={style.footerLinksContainer}>
            <Link to='/' className={style.footerLinks} onClick={handleScroll}>
              Home
            </Link>
            <Link
              to='/stories'
              className={style.footerLinks}
              onClick={handleScroll}
            >
              Stories
            </Link>
            <Link
              to='/create'
              className={style.footerLinks}
              onClick={handleScroll}
            >
              Create
            </Link>
            <Link
              to='/login'
              className={style.footerLinks}
              onClick={handleScroll}
            >
              Login
            </Link>
            <Link
              to='/register'
              className={style.footerLinks}
              onClick={handleScroll}
            >
              Register
            </Link>
            <Link
              to='/subscription'
              className={style.footerLinks}
              onClick={handleScroll}
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
      <p id={style.devP}>
        Made by
        <a
          href='https://github.com/Hergelink'
          target='_blank'
          rel='noreferrer'
          id={style.devA}
          translate='no'
        >
          Hergelink
        </a>
      </p>
    </footer>
  );
}
