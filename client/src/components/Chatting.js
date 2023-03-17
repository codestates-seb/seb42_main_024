import styled from 'styled-components';

const ChattingContianer = styled.div`
  color: var(--color5);
  font-size: 30px;
`;
const EnterMessage = styled.pre`
  text-align: center;
  margin-bottom: 10px;
`;
const CommonChatMessage = styled.pre`
  margin-bottom: 10px;
`;
const UserName = styled.p`
  display: inline;
  color: ${(props) => props.usercolor || 'var(--color7)'};
`;

function Chatting({ chatData }) {
  const isEnter = chatData.type !== 'TALK';
  return (
    <ChattingContianer>
      {isEnter ? (
        <EnterMessage>{chatData.message}</EnterMessage>
      ) : (
        <CommonChatMessage>
          <UserName>{chatData.memberName}</UserName>
          {` : ${chatData.message}`}
        </CommonChatMessage>
      )}
    </ChattingContianer>
  );
}

export default Chatting;
