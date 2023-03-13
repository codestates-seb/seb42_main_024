import { FaQuestion, FaUserCircle, FaHeadphones } from 'react-icons/fa';
import { BsPlusCircle, BsFillSuitHeartFill } from 'react-icons/bs';
import { BiHome, BiLogOut } from 'react-icons/bi';
import { NavContainer, NavList, NavItems, NavFooter } from '../styles/nav';

const Nav = () => {
  return (
    <NavContainer>
      <div className='nav-logo'>
        <FaQuestion className='icons-logo' />
        <span>LOGO</span>
      </div>
      <NavList>
        <NavItems>
          <p className='nav-userinfo'>
            <FaUserCircle />
            <span>USERNAME</span>
          </p>
        </NavItems>
        <NavItems>
          <p className='nav-home'>
            <BiHome />
            <span>홈</span>
          </p>
          <p className='nav-liveroom'>
            <FaHeadphones />
            <span>라이브룸</span>
          </p>
        </NavItems>
        <NavItems>
          <p className='nav-add-playlist'>
            <BsPlusCircle />
            <span>플레이리스트 만들기</span>
          </p>
          <p className='nav-storage'>
            <BsFillSuitHeartFill className='heart' />
            <span>보관함</span>
          </p>
        </NavItems>
        <NavItems>
          <p className='nav-logout'>
            <BiLogOut />
            <span>로그아웃</span>
          </p>
        </NavItems>
      </NavList>
      <NavFooter>
        <p>CodeStates SEB 42th</p>
      </NavFooter>
    </NavContainer>
  );
};

export default Nav;
