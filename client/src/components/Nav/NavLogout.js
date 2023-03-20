import { BiHome } from 'react-icons/bi';
import { FaUserCircle, FaHeadphones } from 'react-icons/fa';
import { NavList, NavItems, Home, LiveRoom, Login } from '../../styles/nav';

const NavLogout = ({ openModal }) => {
  return (
    <>
      <NavList>
        <NavItems>
          <div className='nav-userinfo'>
            <FaUserCircle />
            <Login onClick={openModal}>LOGIN</Login>
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
    </>
  );
};

export default NavLogout;
