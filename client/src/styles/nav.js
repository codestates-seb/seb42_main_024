import styled from 'styled-components';

export const NavContainer = styled.div`
  width: 250px;
  height: 1285px;
  background-color: var(--color1);
  position: fixed;

  .nav-logo {
    color: var(--color6);
    margin: 30px 0px 15px 15px;
    font-size: 25px;
    display: flex;
    align-items: center;
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
    padding-bottom: 12px;
  }

  p {
    display: flex;
    align-items: center;
  }
`;

export const NavFooter = styled.div`
  color: var(--color9);
  position: fixed;
  left: 0;
  bottom: 0;
  margin-left: 15px;
`;
