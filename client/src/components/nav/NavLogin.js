import { useState } from 'react';
import { BiHome, BiLogOut } from 'react-icons/bi';
import { BsPlusCircle } from 'react-icons/bs';
import { IoRadio } from 'react-icons/io5';
import { MdOutlineLibraryMusic } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CreateRoom from './CreateLiveRoom/CreateRoom';
import PlaylistCreator from './playlistCreator/PlaylistCreator';

import {
  NavList,
  NavItems,
  UserInfo,
  Home,
  LiveRoom,
  AddPlayList,
  CreateLiveRoom,
  Logout,
} from '../../styles/nav';

const NavLogin = ({ logoutHandler }) => {
  const user = useSelector((state) => state.user);
  const [isOpenPlaylistCreator, setIsOpenPlaylistCreator] = useState('default');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateOpen = () => {
    setIsCreateOpen((pre) => !pre);
  };

  return (
    <>
      <NavList>
        <NavItems>
          <Link to={'/mypage'} className='nav-mypage-link'>
            <div className='nav-userinfo'>
              <img
                className='profile-pic'
                src={user.picture}
                alt='profile-pic'
              />
              <UserInfo>{user.nickname}</UserInfo>
            </div>
          </Link>
        </NavItems>
        <NavItems>
          <Link to={'/'} className='nav-home-link'>
            <div className='nav-home'>
              <BiHome />
              <Home>홈</Home>
            </div>
          </Link>
          <Link to={'/liveroomlist'} className='nav-liveroom-link'>
            <div className='nav-liveroom'>
              <IoRadio />
              <LiveRoom>라이브룸</LiveRoom>
            </div>
          </Link>
        </NavItems>
        <NavItems>
          <div className='nav-create-liveroom'>
            <MdOutlineLibraryMusic />
            <CreateLiveRoom onClick={handleCreateOpen}>
              라이브룸 만들기
            </CreateLiveRoom>
          </div>
          <div className='nav-add-playlist'>
            <BsPlusCircle />
            <AddPlayList onClick={() => setIsOpenPlaylistCreator('open')}>
              플레이리스트 만들기
            </AddPlayList>
          </div>
        </NavItems>
        <NavItems>
          <div className='nav-logout'>
            <BiLogOut />
            <Logout onClick={logoutHandler}>로그아웃</Logout>
          </div>
        </NavItems>
        <PlaylistCreator
          isOpenPlaylistCreator={isOpenPlaylistCreator}
          setIsOpenPlaylistCreator={setIsOpenPlaylistCreator}
        />
        <CreateRoom
          isCreateOpen={isCreateOpen}
          setIsCreateOpen={setIsCreateOpen}
        />
      </NavList>
    </>
  );
};

export default NavLogin;
