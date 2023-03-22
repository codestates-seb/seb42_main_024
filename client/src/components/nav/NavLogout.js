import { BiHome } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { IoRadio } from 'react-icons/io5';

import { NavList, NavItems, Home, LiveRoom, Login } from '../../styles/nav';

const NavLogout = ({ openModal }) => {
  return (
    <>
      <NavList>
        <NavItems>
          <div className='nav-userinfo'>
            <FaUserCircle className='user-circle' />
            <Login onClick={openModal}>LOGIN</Login>
          </div>
        </NavItems>
        <NavItems>
          <div className='nav-home'>
            <BiHome />
            <Home>홈</Home>
          </div>
          <div className='nav-liveroom'>
            <IoRadio />
            <LiveRoom onClick={openModal}>로그인하고 라이브 즐기기</LiveRoom>
          </div>
        </NavItems>
      </NavList>
    </>
  );
};

export default NavLogout;
