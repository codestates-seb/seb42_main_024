import styled from 'styled-components';

export const ChattingContianer = styled.div`
  color: var(--color5);
  font-size: 30px;
`;
export const EnterMessage = styled.pre`
  text-align: center;
  margin-bottom: 10px;
`;
export const CommonChatMessage = styled.pre`
  margin-bottom: 10px;
`;
export const UserName = styled.p`
  display: inline;
  color: ${(props) => props.usercolor || 'var(--color7)'};
`;
