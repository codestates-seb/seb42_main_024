import styled from 'styled-components';
export const PlayListContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 470px;
  background-color: var(--color1);
  display: flex;
  flex-direction: column;
`;
export const PlayListUl = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color11);
  }

  ::-webkit-scrollbar-thumb {
    background: #999;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  :hover {
    overflow-y: auto;
  }
`;
export const PlayListUlHeader = styled.span`
  color: var(--color8);
  font-size: 16px;
  font-family: var(--ft-pretendardBlack);
  position: relative;
  margin: 26px;
  position: sticky;
  top: 20px;
`;
