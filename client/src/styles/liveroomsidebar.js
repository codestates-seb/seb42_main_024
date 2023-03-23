import styled from 'styled-components';

export const LiveroomSideBarContainer = styled.div`
  width: 1000px;
  height: 100vh;
  background-color: var(--color1);
  border: 1px solid var(--color3);
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

export const LSBHeaderContainer = styled.div`
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color9);
  font-size: 55px;
  > svg {
    margin-left: 10px;
  }
`;
export const LSBPlayListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 47.5%;
`;
export const LSBChatContianer = styled.div`
  margin-top: 20px;
  height: 47.5%;
`;
export const LSBOutBtn = styled.button`
  font-size: 25px;
  font-weight: 600;
  width: 110px;
  height: 60px;
  border-radius: 10px;
`;

export const LSBMemberContainer = styled.div`
  height: 10%;
`;

export const LSBPlayListWrap = styled.div`
  border-radius: 20px;
  height: 90%;
  background-color: var(--color2);
  padding: 50px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
