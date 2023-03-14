import styled from 'styled-components';

export const NavContainer = styled.div`
  width: 250px;
  height: 1285px;
  background-color: var(--color1);
  position: fixed;
  font-family: var(--ft-pretendardMedium);

  .nav-logo {
    color: var(--color6);
    margin: 30px 0px 20px 15px;
    font-size: 25px;
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

  .heart {
    color: var(--color10);
  }

  .nav-home,
  .nav-add-playlist {
    padding-bottom: 14px;
  }

  .nav-userinfo,
  .nav-home,
  .nav-liveroom,
  .nav-add-playlist,
  .nav-storage,
  .nav-logout {
    display: flex;
    align-items: center;
  }
`;

export const UserInfo = styled.button`
  margin-left: 10px;
  height: 16px;
  cursor: pointer;
  border: none;
  background-color: var(--color1);
  color: var(--color9);

  &:hover {
    cursor: pointer;
    background-color: var(--color5);
  }
`;

export const Home = styled.button`
  margin-left: 10px;
  height: 16px;
  cursor: pointer;
  border: none;
  background-color: var(--color1);
  color: var(--color9);

  &:hover {
    cursor: pointer;
    background-color: var(--color5);
  }
`;

export const LiveRoom = styled.button`
  margin-left: 10px;
  height: 16px;
  cursor: pointer;
  border: none;
  background-color: var(--color1);
  color: var(--color9);

  &:hover {
    cursor: pointer;
    background-color: var(--color5);
  }
`;

export const AddPlayList = styled.button`
  margin-left: 10px;
  height: 16px;
  cursor: pointer;
  border: none;
  background-color: var(--color1);
  color: var(--color9);

  &:hover {
    cursor: pointer;
    background-color: var(--color5);
  }
`;

export const Storage = styled.button`
  margin-left: 10px;
  height: 16px;
  cursor: pointer;
  border: none;
  background-color: var(--color1);
  color: var(--color9);

  &:hover {
    cursor: pointer;
    background-color: var(--color5);
  }
`;

export const Login = styled.button`
  margin-left: 10px;
  height: 16px;
  cursor: pointer;
  border: none;
  background-color: var(--color1);
  color: var(--color9);

  &:hover {
    cursor: pointer;
    background-color: var(--color5);
  }
`;

export const Logout = styled.button`
  margin-left: 10px;
  height: 16px;
  cursor: pointer;
  border: none;
  background-color: var(--color1);
  color: var(--color9);

  &:hover {
    cursor: pointer;
    background-color: var(--color5);
  }
`;

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
