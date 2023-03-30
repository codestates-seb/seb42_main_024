import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import axios from 'axios';

import Modal from './Modal';
import NavLogin from './NavLogin';
import NavLogout from './NavLogout';

import { setUserData, deleteUserData } from '../../actions/actions';
import Logo from '../../assets/Logo.png';
import { API } from '../../config';
import { NavContainer, NavFooter } from '../../styles/nav';

const Nav = () => {
  const [modalOpen, setModalOpen] = useState(false);
  //eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLogin = useSelector((state) => state.user !== null);

  const location = useLocation();

  const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;
  const oAuthURL = `${REDIRECT_URL}`;

  // backend로 redirect
  const oAuthHandler = () => {
    window.location.assign(oAuthURL);
  };

  // 로그인 상태 확인
  const checkLoginStatus = async () => {
    // localStorage에서 토큰 가져옴
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      try {
        const response = await axios.get(`${API.MEMBER}/auth`, {
          headers: {
            Authorization: `${storedAccessToken}`,
            accept: 'application/json',
          },
        });
        setData(response);
        dispatch(setUserData(user));
        dispatch(setUserData(response.data));
      } catch (e) {
        console.log(`OAuth token expired`);
      }
    }
  };

  // backend에서 URL로 전달받은 Authorization, Refresh를 분류하여 localStorage에 저장
  // localStorage에 저장 후 ROOT URL로 이동
  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    if (searchParams.has('Authorization') && searchParams.has('Refresh')) {
      const authParam = searchParams.get('Authorization');
      const accessToken = authParam.replace('Bearer', '').trim();
      const refreshToken = searchParams.get('Refresh');

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }

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
    <NavContainer
      className={location.pathname.includes('liverooms') ? 'hide' : ''}>
      <Link to={'/'} className='nav-home-link'>
        <div className='nav-logo'>
          <img className='logo' src={Logo} alt='logo' />
        </div>
      </Link>
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
