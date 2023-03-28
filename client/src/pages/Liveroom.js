import { useEffect, useState } from 'react';
import { BsVolumeMute } from 'react-icons/bs';
import ReactPlayer from 'react-player';

import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import * as SockJS from 'sockjs-client';

import LiveroomPopup from '../components/liveroom/LiveroomPopup';
import LiveroomSidebar from '../components/liveroom/LiveroomSideBar';
// import Nav from '../components/nav/Nav';
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

  const accessToken = localStorage.getItem('accessToken');
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
    axios
      .get('http://15.165.199.44:8080/api/rooms/22', {
        headers: {
          Authorization: `${accessToken}`,
          accept: 'application/json',
        },
      })
      .then((e) => {
        axios
          .get('http://15.165.199.44:8080/api/members/auth', {
            headers: {
              Authorization: `${accessToken}`,
              accept: 'application/json',
            },
          })
          .then((user) => {
            const userData = user.data;
            console.log(userData);
            const roomData = e.data.data;
            console.log(roomData);
            if (!roomData.members.includes(userData.nickname)) {
              const socket = new SockJS('http://15.165.199.44:8080/ws');
              const client = Stomp.over(socket);
              client.connect({}, () => {
                client.subscribe('/sub/chat/room/22', function (join) {
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
                  '/pub/join',
                  {},
                  JSON.stringify({
                    message: message,
                    memberName: userData.nickname,
                    chatroomId: roomData.chatroomId,
                  })
                );
              });
              setsockClient(client);
            } else {
              alert('나가세요');
            }
          });
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://15.165.199.44:8080/api/rooms/22/songs', {
        headers: {
          Authorization: `${accessToken}`,
          accept: 'application/json',
        },
      })
      .then((e) => {
        console.log(e);
        // setSongs(e.data);
      });
  }, [changeSong]);

  return (
    <LiveroomContainer>
      {/* <Nav></Nav> */}
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
