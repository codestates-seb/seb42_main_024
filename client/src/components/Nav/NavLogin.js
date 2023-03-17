import { BiHome, BiLogOut } from 'react-icons/bi';
import { BsPlusCircle, BsFillSuitHeartFill } from 'react-icons/bs';
import { FaUserCircle, FaHeadphones } from 'react-icons/fa';

import {
  NavList,
  NavItems,
  UserInfo,
  Home,
  LiveRoom,
  AddPlayList,
  Storage,
  Logout,
} from '../../styles/nav';

const NavLogin = ({ user, logoutHandler }) => {
  return (
    <>
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
    </>
  );
};

export default NavLogin;
