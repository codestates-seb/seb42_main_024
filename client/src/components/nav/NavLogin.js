import { BiHome, BiLogOut } from 'react-icons/bi';
import { BsPlusCircle, BsFillSuitHeartFill } from 'react-icons/bs';
import { IoRadio } from 'react-icons/io5';
import { MdOutlineLibraryMusic } from 'react-icons/md';

import {
  NavList,
  NavItems,
  UserInfo,
  Home,
  LiveRoom,
  CreateLiveRoom,
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
            <img className='profile-pic' src={user.picture} alt='profile-pic' />
            <UserInfo>{user.nickname}</UserInfo>
          </div>
        </NavItems>
        <NavItems>
          <div className='nav-home'>
            <BiHome />
            <Home>홈</Home>
          </div>
          <div className='nav-liveroom'>
            <IoRadio />
            <LiveRoom>라이브룸</LiveRoom>
          </div>
          <div className='nav-create-liveroom'>
            <MdOutlineLibraryMusic />
            <CreateLiveRoom>라이브룸 만들기</CreateLiveRoom>
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
