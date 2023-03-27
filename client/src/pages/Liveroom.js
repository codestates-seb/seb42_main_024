import { useEffect, useState } from 'react';
import { BsVolumeMute } from 'react-icons/bs';
import ReactPlayer from 'react-player';

import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import * as SockJS from 'sockjs-client';

import LiveroomPopup from '../components/liveroom/LiveroomPopup';
import LiveroomSidebar from '../components/liveroom/LiveroomSideBar';
import {
  LiveroomContainer,
  LiveroomCover,
  LiveAlbumCover,
  LiveroomMainBackground,
  LiveroomSoundBackground,
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
  const [isAlbumCoverHover, setIsAlbumCoverHover] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [volume, setVolume] = useState(0);
  const [a, setA] = useState(0);
  const [playMusic, setPlayMusic] = useState(true);

  const volumeHandler = (e) => {
    if (isDrag) {
      setVolume(() => {
        const value = a + (isDrag - e.clientY) / 350;
        if (value >= 1) {
          return 1;
        } else if (value <= 0) {
          return 0;
        }
        return value;
      });
    }
  };
  const openSideBarSettingHandler = (e) => {
    if (e.target.className.includes('allow')) {
      setOpenSideBarSetting((prev) => !prev);
    }
  };

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
      {openSideBarSetting ? (
        <LiveroomPopup
          openSideBarSettingHandler={openSideBarSettingHandler}></LiveroomPopup>
      ) : null}
      <ReactPlayer
        url='https://www.youtube.com/watch?v=11cta61wi0g?t=66'
        playing={true}
        muted={playMusic}
        width={0}
        volume={volume}
      />
      <LiveroomMainBackground
        onMouseMove={(e) => {
          volumeHandler(e);
        }}
        onMouseUp={() => {
          setIsDrag(false);
          setA(volume);
        }}
        onClick={() => setPlayMusic(false)}>
        <LiveroomCover>
          <LiveAlbumCover
            onMouseEnter={() => setIsAlbumCoverHover(true)}
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-fA-Qx9lHnaUD54TND9pM2DfGvIOS-d5KgvTsdU&s'></LiveAlbumCover>
          {isAlbumCoverHover ? (
            <LiveroomSoundBackground
              onMouseLeave={() => {
                if (!isDrag) {
                  setIsAlbumCoverHover(false);
                }
              }}
              onMouseMove={(e) => {
                volumeHandler(e);
              }}
              onMouseDown={(e) => {
                setIsDrag(e.clientY);
              }}
              onMouseUp={() => {
                setIsDrag(false);
                setA(volume);
              }}>
              {volume === 0 ? (
                <BsVolumeMute></BsVolumeMute>
              ) : (
                Math.round(volume * 100)
              )}
            </LiveroomSoundBackground>
          ) : null}
        </LiveroomCover>
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
