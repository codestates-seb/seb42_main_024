import {
  ChattingContianer,
  CommonChatMessage,
  EnterMessage,
  UserName,
  UserMessage,
} from '../../styles/chatting';

function Chatting({ chatData }) {
  const isEnter = chatData?.type !== 'TALK';
  return (
    <ChattingContianer>
      {isEnter ? (
        <EnterMessage>{chatData?.message}</EnterMessage>
      ) : (
        <CommonChatMessage>
          <UserName>{chatData?.memberName}: </UserName>
          <UserMessage>{`${chatData?.message}`}</UserMessage>
        </CommonChatMessage>
      )}
    </ChattingContianer>
  );
}

export default Chatting;
