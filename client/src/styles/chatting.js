import styled from 'styled-components';

export const ChattingContianer = styled.div`
  color: var(--color5);
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;
export const EnterMessage = styled.pre`
  text-align: center;
  margin-bottom: 20px;
  border-radius: 10px;
  color: var(--color3);
  padding: 5px;
  background-color: var(--color7);
`;
export const CommonChatMessage = styled.pre`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
`;
export const UserName = styled.pre`
  color: ${(props) => props.usercolor || 'var(--color7)'};
`;

export const UserMessage = styled.p`
  word-break: break-all;
  white-space: pre-wrap;
`;
