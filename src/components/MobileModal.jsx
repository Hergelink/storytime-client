import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Header.module.css';

export default function MobileModal({ toggleMobileMenu, logout, userEmail }) {
  const handleScroll = () => {
    const element = document.querySelector('header');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = () => {
    toggleMobileMenu();
    handleScroll();
  };

  return (
    <div id={style.mobileModal}>
      <div id={style.miniHeader}>
        <Link to='/' id={style.siteLogo} onClick={handleClick}>
          StoryTime
        </Link>
        <div id={style.mobileMenuBtn} onClick={handleClick}>
          <span className={style.hamburger}></span>
          <span className={style.hamburger}></span>
          <span className={style.hamburger}></span>
        </div>
      </div>
      <nav id={style.mobileNav}>
        <Link to='/' className={style.mobileLinks} onClick={handleClick}>
          Home
        </Link>
        <Link to='/stories' className={style.mobileLinks} onClick={handleClick}>
          Stories
        </Link>
        <Link to='/create' className={style.mobileLinks} onClick={handleClick}>
          + Create
        </Link>
        {userEmail ? (
          <button onClick={logout} id={style.logoutBtn}>Logout</button>
        ) : (
          <Link to='/login' id={style.loginBtn}>
            Login
          </Link>
        )}
      </nav>
    </div>
  );
}
