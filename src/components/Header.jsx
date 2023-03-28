import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../components/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import style from '../styles/Header.module.css';
import MobileModal from './MobileModal';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [menuState, setMenuState] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/profile`, {
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Not authenticated');
        }
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.error(error);
        setUserInfo(null);
      });
  }, [setUserInfo]);

  const navigate = useNavigate();

  function logout() {
    fetch(`${process.env.REACT_APP_API_END_POINT}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then((response) => {
      if (response.status === 200) {
        setUserInfo(null);
        navigate('/', { replace: true }); // Redirect to home page and replace the current entry in the history stack
      }
    });
  }

  useEffect(() => {
    if (userInfo === null) {
      setUserInfo(null);
    }
  }, [userInfo, setUserInfo]);

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
        {userInfo ? (
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
