import styled from 'styled-components';

export const LSBChatContianer = styled.div`
  height: 100%;
`;
export const LSBChatDetail = styled.div`
  border-radius: 20px;
  height: ${(props) => props.sendChatHeight || 88}%;
  background-color: var(--color2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
export const LSBSendMessage = styled.textarea`
  width: 100%;
  margin-top: 2%;
  border-radius: 20px;
  height: ${(props) => props.sendChatHeight || '10'}%;
  background-color: var(--color2);
  resize: none;
  border: none;
  font-size: 20px;
  color: var(--color6);
  padding: 14px;
`;
