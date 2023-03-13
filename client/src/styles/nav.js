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
  }

  span {
    display: flex;
    text-align: center;
    height: 25px;
  }
`;

export const NavList = styled.ul`
  width: 100%;
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

  p {
    display: flex;
    align-items: center;
  }

  span {
    padding-left: 10px;
    height: 16px;
  }
`;

export const NavFooter = styled.div`
  color: var(--color9);
  position: fixed;
  left: 0;
  bottom: 0;
  margin-left: 15px;
`;
