import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import * as SockJS from 'sockjs-client';

import LiveroomSetting from '../components/liveroom/LiveroomSetting';
import LiveroomSidebar from '../components/liveroom/LiveroomSideBar';
import {
  LiveroomContainer,
  LiveAlbumCover,
  LiveroomMainBackground,
} from '../styles/liveroom';
import 'animate.css';

function Liveroom() {
  const [openSideBarSetting, setOpenSideBarSetting] = useState(false);
  const [message, setMessage] = useState('');
  const [sockClient, setsockClient] = useState(() => {});
  const [chatDatas, setChatDatas] = useState([]);
  const [songs] = useState([
    {
      key: 1,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      playtime: '3:30',
    },
    {
      key: 2,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      playtime: '3:30',
    },
    {
      key: 3,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      playtime: '3:30',
    },
    {
      key: 4,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      playtime: '3:30',
    },
    {
      key: 6,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      playtime: '3:30',
    },
    {
      key: 7,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      playtime: '3:30',
    },
    {
      key: 8,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      playtime: '3:30',
    },
  ]);

  const [changeSong, setChangeSong] = useState(false);
  const openSideBarSettingHandler = () => {
    setOpenSideBarSetting((prev) => !prev);
  };
  const [playMusic, setPlayMusic] = useState(true);

  useEffect(() => {
    const socket = new SockJS(
      'http://ec2-13-124-65-151.ap-northeast-2.compute.amazonaws.com:8080/ws'
    );
    const client = Stomp.over(socket);
    client.connect({}, () => {
      client.subscribe('/sub/chat/room/1', function (join) {
        const receiveData = JSON.parse(join.body);
        if (receiveData.type === 'SYSTEM') {
          if (receiveData.message === 'NEXTSONG') {
            setChangeSong((prev) => !prev);
          }
        } else {
          setChatDatas((prev) => [...prev, receiveData]);
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
  }, []);

  useEffect(() => {
    axios
      .get(
        'http://ec2-13-124-65-151.ap-northeast-2.compute.amazonaws.com:8080/rooms/1/songs'
      )
      .then(() => {
        // setSongs(e.data);
      });
  }, [changeSong]);

  return (
    <LiveroomContainer>
      <ReactPlayer
        url='https://www.youtube.com/watch?v=11cta61wi0g?t=66'
        playing={true}
        muted={playMusic}
        width={0}
      />
      <LiveroomMainBackground onClick={() => setPlayMusic(false)}>
        {openSideBarSetting ? (
          <LiveroomSetting
            openSideBarSettingHandler={
              openSideBarSettingHandler
            }></LiveroomSetting>
        ) : null}
        <LiveAlbumCover src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-fA-Qx9lHnaUD54TND9pM2DfGvIOS-d5KgvTsdU&s'></LiveAlbumCover>
      </LiveroomMainBackground>
      <LiveroomSidebar
        message={message}
        setMessage={setMessage}
        sockClient={sockClient}
        chatDatas={chatDatas}
        openSideBarSettingHandler={openSideBarSettingHandler}
        songs={songs}></LiveroomSidebar>
    </LiveroomContainer>
  );
}

export default Liveroom;
