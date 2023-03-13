import { FaQuestion, FaUserCircle, FaHeadphones } from 'react-icons/fa';
import { BsPlusCircle, BsFillSuitHeartFill } from 'react-icons/bs';
import { BiHome, BiLogOut } from 'react-icons/bi';
import { NavContainer, NavList, NavItems, NavFooter } from '../styles/nav';

const Nav = () => {
  return (
    <NavContainer>
      <div className='nav-logo'>
        <FaQuestion className='icons-logo' /> LOGO
      </div>
      <NavList>
        <NavItems>
          <p className='nav-userinfo'>
            <FaUserCircle /> USERNAME
          </p>
        </NavItems>
        <NavItems>
          <p className='nav-home'>
            <BiHome /> 홈
          </p>
          <p className='nav-liveroom'>
            <FaHeadphones /> 라이브룸
          </p>
        </NavItems>
        <NavItems>
          <p className='nav-add-playlist'>
            <BsPlusCircle /> 플레이리스트 만들기
          </p>
          <p className='nav-storage'>
            <BsFillSuitHeartFill className='heart' /> 보관함
          </p>
        </NavItems>
        <NavItems>
          <p className='nav-logout'>
            <BiLogOut /> 로그아웃
          </p>
        </NavItems>
      </NavList>
      <NavFooter>Footer Test</NavFooter>
    </NavContainer>
  );
};

export default Nav;
