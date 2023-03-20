import {
  ChattingContianer,
  CommonChatMessage,
  EnterMessage,
  UserName,
} from '../../styles/chatting';

function Chatting({ chatData }) {
  const isEnter = chatData?.type !== 'TALK';
  return (
    <ChattingContianer>
      {isEnter ? (
        <EnterMessage>{chatData?.message}</EnterMessage>
      ) : (
        <CommonChatMessage>
          <UserName>{chatData?.memberName}</UserName>
          {` : ${chatData?.message}`}
        </CommonChatMessage>
      )}
    </ChattingContianer>
  );
}

export default Chatting;
