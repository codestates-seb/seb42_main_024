import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background-color: var(--color1);
  overflow-y: scroll;
`;

export const InfoBoxContainer = styled.div`
  background-color: var(--color11);
  height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color9);
  & .info {
    margin-left: 25px;
    & .title {
      font-size: 50px;
      font-family: var(--ft-pretendardExtraBold);
      margin: 25px 0;
    }
    & .desc {
      width: 584px;
      height: 122px;
      font-size: 15px;
      font-family: var(--ft-pretendardThin);
      overflow-y: hidden;
    }
    & .btns {
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 18px;
      & button {
        width: 80px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid var(--color9);
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        &.btn1 {
          background-color: var(--color9);
        }
        &.btn2 {
          background-color: var(--color2);
          color: var(--color9);
        }
      }
    }
  }
`;

export const ListBoxContainer = styled.div`
  margin: 120px;
  background-color: var(--color2);
  padding: 100px;
  & .row {
    background-color: inherit;
    border: none;
    width: 100%;
    display: flex;
    color: var(--color9);
    border-radius: 5px;
    margin: 5px 0;
    padding: 14px 30px;
    &:first-child {
      border-bottom: 1px solid var(--color3);
    }
    & > * {
      flex-basis: 0;
      text-align: left;
    }
    & .num {
      flex-grow: 1;
    }
    & .title {
      flex-grow: 4;
    }
    & .artist {
      flex-grow: 3;
    }
    & .album {
      flex-grow: 3;
    }
    & .playtime {
      flex-grow: 1;
      text-align: right;
    }
    &:not(:first-child):hover {
      background-color: rgba(217, 217, 217, 0.5);
    }
  }
`;
