import { useEffect, useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import Modal from './Modal';
import NavLogin from './NavLogin';
import NavLogout from './NavLogout';

import { setUserData, deleteUserData } from '../../actions/actions';
import { NavContainer, NavFooter } from '../../styles/nav';

const Nav = () => {
  const [modalOpen, setModalOpen] = useState(false);
  //eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLogin = useSelector((state) => state.user !== null);

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
        dispatch(setUserData(user));
        dispatch(setUserData(response.data));
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
    dispatch(deleteUserData());
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
              isLogin={isLogin}
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
