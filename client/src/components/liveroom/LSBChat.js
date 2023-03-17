import { useEffect, useState } from 'react';

import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

import Chatting from './Chatting';

import {
  LSBChatContianer,
  LSBSendMessage,
  LSBChatDetail,
} from '../../styles/lsbchat';

function LSBChat() {
  const [message, setMessage] = useState('');
  const [sockClient, setsockClient] = useState(() => {});
  const [chatDatas, setChatDatas] = useState([]);

  useEffect(() => {
    const socket = new SockJS(
      'http://ec2-13-124-65-151.ap-northeast-2.compute.amazonaws.com:8080/ws'
    );
    const client = Stomp.over(socket);
    client.connect({}, () => {
      client.subscribe('/sub/chat/room/1', function (join) {
        console.log(JSON.parse(join.body));
        setChatDatas((prev) => [...prev, JSON.parse(join.body)]);
      });
      client.send(
        '/pub/chat/join',
        {},
        JSON.stringify({
          message: message,
          memberName: '아무',
          chatroomId: '1',
        })
      );
    });
    setsockClient(client);
  }, []);

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
