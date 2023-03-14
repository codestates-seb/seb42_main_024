import { FaQuestion, FaUserCircle, FaHeadphones } from 'react-icons/fa';
import { BsPlusCircle, BsFillSuitHeartFill } from 'react-icons/bs';
import { BiHome, BiLogOut } from 'react-icons/bi';
import {
  NavContainer,
  NavList,
  NavItems,
  UserInfo,
  Home,
  LiveRoom,
  AddPlayList,
  Storage,
  Login,
  Logout,
  NavFooter,
} from '../styles/nav';
import { useState } from 'react';
import Modal from './Modal';

const Nav = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const logoutHandler = () => {
    setUser(null);
    setIsLogin(false);
  };

  return (
    <NavContainer>
      <div className='nav-logo'>
        <FaQuestion className='icons-logo' />
        <span>LOGO</span>
      </div>
      {isLogin ? (
        <NavList>
          <NavItems>
            <div className='nav-userinfo'>
              <FaUserCircle />
              <UserInfo user={user}>USERNAME</UserInfo>
            </div>
          </NavItems>
          <NavItems>
            <div className='nav-home'>
              <BiHome />
              <Home>홈</Home>
            </div>
            <div className='nav-liveroom'>
              <FaHeadphones />
              <LiveRoom>라이브룸</LiveRoom>
            </div>
          </NavItems>
          <NavItems>
            <div className='nav-add-playlist'>
              <BsPlusCircle />
              <AddPlayList>플레이리스트 만들기</AddPlayList>
            </div>
            <div className='nav-storage'>
              <BsFillSuitHeartFill className='heart' />
              <Storage>보관함</Storage>
            </div>
          </NavItems>
          <NavItems>
            <div className='nav-logout'>
              <BiLogOut />
              <Logout onClick={logoutHandler}>로그아웃</Logout>
            </div>
          </NavItems>
        </NavList>
      ) : (
        <NavList>
          <NavItems>
            <div className='nav-userinfo'>
              <FaUserCircle />
              <Login onClick={openModal}>LOGIN</Login>
              {modalOpen && !isLogin && (
                <Modal setIsLogin={setIsLogin} setModalOpen={setModalOpen} />
              )}
            </div>
          </NavItems>
          <NavItems>
            <div className='nav-home'>
              <BiHome />
              <Home>홈</Home>
            </div>
            <div className='nav-liveroom'>
              <FaHeadphones />
              <LiveRoom>라이브룸</LiveRoom>
            </div>
          </NavItems>
        </NavList>
      )}
      <NavFooter>
        <p>CodeStates SEB 42th</p>
      </NavFooter>
    </NavContainer>
  );
};

export default Nav;
