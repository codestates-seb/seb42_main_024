import { useEffect, useState } from 'react';

import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import * as SockJS from 'sockjs-client';

import LiveroomSidebar from '../components/liveroom/LiveroomSideBar';
import {
  LiveroomContainer,
  LiveAlbumCover,
  LiveroomMainBackground,
  LiveRoomBtnContianer,
  LiveRoomBtn,
  LiveRoomSettingContainer,
  LiveRoomSettingView,
} from '../styles/liveroom';

import 'animate.css';

function Liveroom() {
  const [sidebarBtnState, setSidebarBtnState] = useState(false);
  const [openSideBarSetting, setOpenSideBarSetting] = useState(false);
  const [message, setMessage] = useState('');
  const [sockClient, setsockClient] = useState(() => {});
  const [chatDatas, setChatDatas] = useState([]);
  const sidebarBtnStateHandler = () => {
    console.log(sidebarBtnState);
    setSidebarBtnState((prev) => !prev);
  };
  const openSideBarSettingHandler = () => {
    setOpenSideBarSetting((prev) => !prev);
  };
  useEffect(() => {
    const socket = new SockJS(
      'http://ec2-13-124-65-151.ap-northeast-2.compute.amazonaws.com:8080/ws'
    );
    const client = Stomp.over(socket);
    client.connect({}, () => {
      client.subscribe('/sub/chat/room/1', function (join) {
        console.log(JSON.parse(join.body));
        if (JSON.parse(join.body).type === 'SYSTEM') {
          console.log(JSON.parse(join.body));
        } else {
          setChatDatas((prev) => [...prev, JSON.parse(join.body)]);
        }
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
    axios
      .get(
        'http://ec2-13-124-65-151.ap-northeast-2.compute.amazonaws.com:8080/rooms/1/songs'
      )
      .then((e) => {
        console.log(e);
      });
  }, []);
  return (
    <LiveroomContainer>
      <LiveroomMainBackground>
        {openSideBarSetting ? (
          <LiveRoomSettingContainer onClick={openSideBarSettingHandler}>
            <LiveRoomSettingView></LiveRoomSettingView>
          </LiveRoomSettingContainer>
        ) : null}
        <LiveAlbumCover src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-fA-Qx9lHnaUD54TND9pM2DfGvIOS-d5KgvTsdU&s'></LiveAlbumCover>
        <LiveRoomBtnContianer>
          <LiveRoomBtn onClick={sidebarBtnStateHandler}></LiveRoomBtn>
        </LiveRoomBtnContianer>
      </LiveroomMainBackground>
      <LiveroomSidebar
        message={message}
        setMessage={setMessage}
        sockClient={sockClient}
        chatDatas={chatDatas}
        sidebarBtnState={sidebarBtnState}
        openSideBarSettingHandler={openSideBarSettingHandler}></LiveroomSidebar>
    </LiveroomContainer>
  );
}

export default Liveroom;
