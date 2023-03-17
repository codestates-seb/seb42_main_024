import { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import Chatting from './Chatting';

const LSBChatContianer = styled.div`
  height: 100%;
`;
const LSBChatDetail = styled.div`
  border-radius: 20px;
  height: 88%;
  background-color: var(--color2);
  padding: 50px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const LSBSendMessage = styled.textarea`
  width: 100%;
  margin-top: 2%;
  border-radius: 20px;
  height: 10%;
  background-color: var(--color2);
  resize: none;
  border: none;
  font-size: 50px;
  color: var(--color6);
  padding: 25px;
`;

function LSBChat() {
  const [message, setMessage] = useState('');
  const [sockClient, setsockClient] = useState(() => {});
  const [chatDatas, setChatDatas] = useState([]);
  const [userName, setuUerName] = useState('')

  useEffect(() => {
    axios
      .post(
        'http://ec2-13-124-65-151.ap-northeast-2.compute.amazonaws.com:8080/rooms',
        {
          userName: '123',
          title: '123',
        }
      )
      .then(function (e) {
        setuUerName(e.data)
        const socket = new SockJS(
          'http://ec2-13-124-65-151.ap-northeast-2.compute.amazonaws.com:8080/ws'
        );
        const client = Stomp.over(socket);
        client.connect({}, () => {
          client.subscribe('/sub/chat/room/1', function (join) {
            console.log(JSON.parse(join.body))
            setChatDatas((prev)=>[...prev,JSON.parse(join.body)])
          });
          client.send(
            '/pub/chat/join',
            {},
            JSON.stringify({
              message: message,
              memberName: e.data,
              chatroomId: '1',
            })
          );
        });
        setsockClient(client);
        console.log(e);
      });
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
          memberName: userName,
          chatroomId: '1',
        })
      );
      setMessage('');
    }
  };

  return (
    <LSBChatContianer>
      <LSBChatDetail>
        {chatDatas.map((e,i) => {
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
