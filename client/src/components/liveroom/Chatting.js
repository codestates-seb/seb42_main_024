import { useEffect } from 'react';
import { usePageVisibility } from 'react-page-visibility';

import alarms from '../../assets/alarm.mp3';
import {
  ChattingContianer,
  CommonChatMessage,
  EnterMessage,
  UserName,
  UserMessage,
} from '../../styles/chatting';

function Chatting({ chatData, setMembers }) {
  const isEnter = chatData?.type !== 'TALK';

  const isVisible = usePageVisibility();

  useEffect(() => {
    const audio = new Audio(alarms);
    const alarmhandler = () => {
      audio.play();
    };
    if (isEnter) {
      setMembers((prev) => [...prev, chatData.memberName]);
      if (chatData?.type === 'LEAVE') {
        setMembers((prev) => {
          return prev.filter((e) => e !== chatData?.memberName);
        });
      }
    }
    if (!isEnter && !isVisible) {
      alarmhandler();
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
