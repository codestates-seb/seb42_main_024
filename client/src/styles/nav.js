import styled from 'styled-components';

export const NavContainer = styled.div`
  width: 250px;
  height: 1285px;
  background-color: var(--color1);
  position: fixed;
  font-family: var(--ft-pretendardMedium);
  z-index: 10;

  .logo {
    width: 170px;
    height: 41px;
    margin: 30px 0px 15px 15px;
    display: flex;
    text-align: center;
    cursor: pointer;
  }

  span {
    display: flex;
    text-align: center;
    height: 25px;
  }
`;

export const NavList = styled.ul`
  width: 100%;
  padding: 0;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const NavItems = styled.li`
  display: flex;
  flex-direction: column;
  color: var(--color9);
  width: 88%;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  padding: 13px 0px;
  margin-left: 15px;
  border-top: 1px solid var(--color3);

  .user-circle {
    width: 30px;
    height: 30px;
  }

  .profile-pic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .nav-userinfo {
    height: 40px;
  }

  .nav-home,
  .nav-liveroom,
  .nav-create-liveroom,
  .nav-add-playlist,
  .nav-logout {
    height: 30px;
  }

  .nav-userinfo,
  .nav-home,
  .nav-liveroom,
  .nav-create-liveroom,
  .nav-add-playlist,
  .nav-logout {
    display: flex;
    align-items: center;
    width: 100%;

    &:hover {
      cursor: pointer;
      background-color: var(--color5);
    }

    &:hover button {
      background-color: var(--color5);
    }
  }
`;

export const Home = styled.button`
  margin-left: 10px;
  width: 100%;
  height: 16px;
  text-align: left;
  cursor: pointer;
  border: none;
  background-color: var(--color1);
  color: var(--color9);
`;

export const UserInfo = styled(Home)`
  font-size: 15px;
`;

export const LiveRoom = styled(Home)``;

export const CreateLiveRoom = styled(Home)``;

export const AddPlayList = styled(Home)``;

export const Login = styled(Home)`
  font-size: 15px;
`;

export const Logout = styled(Home)``;

export const NavFooter = styled.div`
  color: var(--color9);
  position: fixed;
  left: 0;
  bottom: 0;
  margin-left: 15px;
  margin-bottom: 50px;
  width: 250px;

  p {
    font-size: 12px;
  }
`;
