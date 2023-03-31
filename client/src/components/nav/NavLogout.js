import { BiHome } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { IoRadio } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { NavList, NavItems, Home, LiveRoom, Login } from '../../styles/nav';

const NavLogout = ({ openLoginModal }) => {
  return (
    <>
      <NavList>
        <NavItems>
          <div className='nav-userinfo'>
            <FaUserCircle className='user-circle' />
            <Login onClick={openLoginModal}>LOGIN</Login>
          </div>
        </NavItems>
        <NavItems>
          <Link to={'/'} className='nav-home-link'>
            <div className='nav-home'>
              <BiHome />
              <Home>홈</Home>
            </div>
          </Link>
          <div className='nav-liveroom'>
            <IoRadio />
            <LiveRoom onClick={openLoginModal}>
              로그인하고 라이브 즐기기
            </LiveRoom>
          </div>
        </NavItems>
      </NavList>
    </>
  );
};

export default NavLogout;
