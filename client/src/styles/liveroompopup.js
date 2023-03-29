import styled from 'styled-components';

export const LiveroomPopupContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 1, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

export const LiveroomPopupView = styled.div`
  width: 300px;
  height: 200px;
  padding: 30px;
  color: var(--color9);
  text-align: center;
  background-color: var(--color1);
  border-radius: 20px;
  z-index: 3;
  border: 2px solid gray;
`;
export const TextContainer = styled.div`
  width: 100%;
  height: 80%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: keep-all;
  line-height: 30px;
  font-weight: 600;
`;

export const CheckBtnContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-evenly;
`;

export const CheckBtn = styled.button`
  min-width: 60px;
  height: 40px;
  border-radius: 20%;
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  border: 1px solid gray;
  :hover {
    opacity: 0.5;
  }
`;
