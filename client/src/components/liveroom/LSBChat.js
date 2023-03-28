import { useEffect, useRef } from 'react';

import {
  LSBChatContianer,
  LSBSendMessage,
  LSBChatDetail,
} from '../../styles/lsbchat';

function LSBChat({
  message,
  setMessage,
  sockClient,
  chatDatas,
  roomid,
  userNickName,
}) {
  // const [sendChatHeight, setSendChatHeight] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    console.log(scrollRef.current.scrollTop);
  }, [chatDatas]);
  const changeMessageHandler = (e) => {
    setMessage(e.target.value);
  };
  const inputMessageHandler = (e) => {
    if (e.nativeEvent.isComposing) return;
    else if (e.key === 'Enter' && e.shiftKey) {
      return;
    } else if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  const sendMessageHandler = (e) => {
    const isOnlyEnter = message.split('\n').join('') === '';
    if (isOnlyEnter && e.key === 'Enter' && !e.shiftKey) {
      setMessage('');
    } else if (message !== '' && e.key === 'Enter' && !e.shiftKey) {
      sockClient.send(
        '/pub/message',
        {},
        JSON.stringify({
          message: message,
          memberName: userNickName,
          chatroomId: roomid,
        })
      );
      setMessage('');
    }
  };

  return (
    <LSBChatContianer>
      <LSBChatDetail ref={scrollRef}>
        {chatDatas.map((e, i) => {
          return <Chatting key={i} chatData={e}></Chatting>;
        })}
      </LSBChatDetail>
      <LSBSendMessage
        value={message}
        placeholder='메시지를 입력해 주세요...'
        onChange={(e) => {
          changeMessageHandler(e);
        }}
        onKeyDown={(e) => {
          inputMessageHandler(e);
        }}
        onKeyUp={(e) => {
          sendMessageHandler(e);
        }}></LSBSendMessage>
    </LSBChatContianer>
  );
}

export default LSBChat;
