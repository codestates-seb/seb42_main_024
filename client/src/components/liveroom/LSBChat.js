import axios from 'axios';

import Chatting from './Chatting';

import {
  LSBChatContianer,
  LSBSendMessage,
  LSBChatDetail,
} from '../../styles/lsbchat';

function LSBChat({ message, setMessage, sockClient, chatDatas }) {
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
    if (message !== '' && e.key === 'Enter' && !e.shiftKey) {
      sockClient.send(
        '/pub/chat/message',
        {},
        JSON.stringify({
          message: message,
          memberName: '아무',
          chatroomId: '1',
        })
      );
      axios
        .post(
          'http://ec2-13-124-65-151.ap-northeast-2.compute.amazonaws.com:8080/rooms/1/songs/next',
          { videoId: 'video2' }
        )
        .then((e) => {
          console.log(e);
        });
      setMessage('');
    }
  };

  return (
    <LSBChatContianer>
      <LSBChatDetail>
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
