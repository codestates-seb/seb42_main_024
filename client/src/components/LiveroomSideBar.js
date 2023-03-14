import styled from 'styled-components';
import { BsFillGearFill } from 'react-icons/bs';

const LiveroomSideBarContainer = styled.div`
  width: 1000px;
  height: 100vh;
  background-color: var(--color1);
  border: 1px solid var(--color3);
  display: flex;
  flex-direction: column;
  padding: 80px;
`;

const LSBHeaderContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color9);
  font-size: 100px;
`;
const LSBPlayListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 8;
`;
const LSBChatContianer = styled.div`
margin-top: 20px;
  flex-grow: 8;
`;
const LSBOutBtn = styled.button`
  font-size: 38px;
  font-weight: 600;
  width: 160px;
  height: 90px;
  border-radius: 10px;
`;

const LSBMemberContainer = styled.div`
  flex-grow: 1;
`;
const LSBPlayList = styled.div`
  border-radius: 20px;
  flex-grow: 10;
  background-color: var(--color2);
`;

function LiveroomSideBar() {
  return (
    <LiveroomSideBarContainer>
      <LSBHeaderContainer>
        <BsFillGearFill></BsFillGearFill>
        <LSBOutBtn>나가기</LSBOutBtn>
      </LSBHeaderContainer>
      <LSBPlayListContainer>
        <LSBMemberContainer></LSBMemberContainer>
        <LSBPlayList></LSBPlayList>
      </LSBPlayListContainer>
      <LSBChatContianer>
      </LSBChatContianer>
    </LiveroomSideBarContainer>
  );
}

export default LiveroomSideBar;
