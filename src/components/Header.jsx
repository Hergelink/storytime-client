import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../components/UserContext';
import { Link } from 'react-router-dom';
import style from '../styles/Header.module.css';
import MobileModal from './MobileModal';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [menuState, setMenuState] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/profile`, {
      // fetch('http://localhost:3001/profile', {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:3001/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const userEmail = userInfo?.email;

  const toggleMobileMenu = () => {
    setMenuState(!menuState);
  };

  return (
    <header>
      <Link to='/' id={style.siteLogo} translate='no'>
        StoryTime
      </Link>
      <div id={style.mobileMenuBtn} onClick={toggleMobileMenu}>
        <span className={style.hamburger}></span>
        <span className={style.hamburger}></span>
        <span className={style.hamburger}></span>
      </div>

      {menuState ? (
        <MobileModal
          toggleMobileMenu={toggleMobileMenu}
          userEmail={userEmail}
          logout={logout}
        />
      ) : (
        ''
      )}

      <nav id={style.desktopNavContainer}>
        <Link to='/' className={style.desktopLinks}>
          Home
        </Link>
        <Link to='/stories' className={style.desktopLinks}>
          Stories
        </Link>
        <Link to='/create' className={style.desktopLinks}>
          + Create
        </Link>
        {userEmail ? (
          <button onClick={logout} id={style.logoutBtn}>
            Logout
          </button>
        ) : (
          <Link to='/login' id={style.loginBtn}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
