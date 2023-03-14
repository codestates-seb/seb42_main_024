import styled from 'styled-components';
import PlayListLi from './PlayListLi';
const PlayListContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 470px;
  background-color: var(--color11);
`;
const PlayListUl = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const PlayListUlHeader = styled.span`
  color: var(--color8);
  font-size: 16px;
  font-family: var(--ft-pretendardBlack);
  position: relative;
  margin: 26px;
`;
function PlayList() {
  return (
    <PlayListContainer>
      <PlayListUl>
        <PlayListUlHeader>플레이리스트 음악목록</PlayListUlHeader>
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
      </PlayListUl>
    </PlayListContainer>
  );
}

export default PlayList;
