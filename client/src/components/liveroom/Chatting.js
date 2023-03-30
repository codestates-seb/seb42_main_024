import { useEffect } from 'react';

import {
  ChattingContianer,
  CommonChatMessage,
  EnterMessage,
  UserName,
  UserMessage,
} from '../../styles/chatting';

function Chatting({ chatData, setMembers }) {
  const isEnter = chatData?.type !== 'TALK';
  useEffect(() => {
    if (isEnter) {
      setMembers((prev) => [...prev, chatData.memberName]);
      if (chatData?.type === 'LEAVE') {
        setMembers((prev) => {
          return prev.filter((e) => e !== chatData?.memberName);
        });
      }
    }
  }, []);

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
