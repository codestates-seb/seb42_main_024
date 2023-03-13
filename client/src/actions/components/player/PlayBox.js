import styled from 'styled-components';
const PlayBoxWarp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  color: var(--color9);
`;
const PlayBoxImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: white;
  margin-right: 11px;
`;
const PlayBoxInfo = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  width: 150px;
`;
const PlayBoxTitle = styled.span`
  font-size: 15px;
  font-weight: var(--ft-pretendardExtraBold);
`;
const PlayBoxContent = styled.span`
  font-weight: var(--ft-pretendardRegular);
  font-size: 12px;
`;

function PlayBox() {
    return (
        <PlayBoxWarp>
            <PlayBoxImg />
            <PlayBoxInfo>
                <PlayBoxTitle>타이틀</PlayBoxTitle>
                <PlayBoxContent>가수제목</PlayBoxContent>
            </PlayBoxInfo>
        </PlayBoxWarp>
    );
}

export default PlayBox;
