import styled from 'styled-components';
const PlayListBox = styled.div``;
const PlayListLiContainer = styled.li`
  color: white;
  height: 60px;
  display: flex;
  align-items: center;
  margin: 0 20px;
  padding: 8px;
  cursor: pointer;
  border-bottom: 0.5px solid rgb(85, 85, 85);
`;
const PlayListLiCover = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 10px;
  margin-right: 10px;
  background-color: white;
`;
const PlayListLiContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 310px;
`;
const PlayListLiTitle = styled.span`
  font-size: 15px;
  font-family: var(--ft-pretendardBold);
`;
const PlayListLiContent = styled.span`
  font-family: var(--ft-pretendardRegular);
  font-size: 12px;
`;
function PlayListLi() {
  return (
    <PlayListBox>
      <PlayListLiContainer>
        <PlayListLiCover />
        <PlayListLiContentBox>
          <PlayListLiTitle>2000/90</PlayListLiTitle>
          <PlayListLiContent>기리기리</PlayListLiContent>
        </PlayListLiContentBox>
        <p>0:00</p>
      </PlayListLiContainer>
    </PlayListBox>
  );
}

export default PlayListLi;
