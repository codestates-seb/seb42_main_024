import { useEffect, useState } from 'react';
import { FaQuestion } from 'react-icons/fa';

import axios from 'axios';

import Modal from './Modal';
import NavLogin from './NavLogin';
import NavLogout from './NavLogout';

import { NavContainer, NavFooter } from '../../styles/nav';

const Nav = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(null); //eslint-disable-line no-unused-vars

  const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;
  const AUTH_URL = process.env.REACT_APP_AUTH_URL;

  const oAuthURL = `${REDIRECT_URL}`;

  const oAuthHandler = () => {
    window.location.assign(oAuthURL);
  };

  const checkLoginStatus = async () => {
    const storedAccessToken = localStorage.getItem('accessToken');

    if (storedAccessToken) {
      try {
        const response = await axios.get(`${AUTH_URL}`, {
          headers: {
            authorization: `Bearer ${storedAccessToken}`,
            accept: 'application/json',
          },
        });
        setData(response);
        setUser(response.data);
        setIsLogin(true);
      } catch (e) {
        console.log(`oAuth token expired`);
      }
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    if (searchParams.has('Authorization') && searchParams.has('Refresh')) {
      const authParam = searchParams.get('Authorization');
      const accessToken = authParam.replace('Bearer', '').trim();
      const refreshToken = searchParams.get('Refresh');

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      localStorage.setItem('refreshToken', refreshToken);

      searchParams.delete('Authorization');
      searchParams.delete('Refresh');
      window.location.replace(
        `${url.origin}${url.pathname}${
          searchParams.toString() ? '?' + searchParams.toString() : ''
        }`
      );
    }
    checkLoginStatus();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const logoutHandler = () => {
    setUser(null);
    setIsLogin(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <NavContainer>
      <div className='nav-logo'>
        <FaQuestion className='icons-logo' />
        <span>LOGO</span>
      </div>
      {isLogin ? (
        <NavLogin user={user} logoutHandler={logoutHandler} />
      ) : (
        <>
          <NavLogout openModal={openModal} />
          {modalOpen && !isLogin && (
            <Modal
              setIsLogin={setIsLogin}
              setModalOpen={setModalOpen}
              oAuthHandler={oAuthHandler}
            />
          )}
        </>
      )}
      <NavFooter>
        <p>CodeStates SEB 42th</p>
      </NavFooter>
    </NavContainer>
  );
};

export default Nav;
