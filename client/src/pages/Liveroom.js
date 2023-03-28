import { useEffect, useState } from 'react';
import { BsVolumeMute } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import * as SockJS from 'sockjs-client';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import LiveroomPopup from '../components/liveroom/LiveroomPopup';
import LiveroomSidebar from '../components/liveroom/LiveroomSideBar';
// import Nav from '../components/nav/Nav';
import {
  LiveroomContainer,
  LiveroomCover,
  LiveAlbumCover,
  LiveroomMainBackground,
  LiveroomSoundBackground,
  PlayList,
} from '../styles/liveroom';
import 'animate.css';

function Liveroom() {
  const { liveroomid } = useParams();
  const roomid = liveroomid.slice(1, liveroomid.length);
  const [openSideBarSetting, setOpenSideBarSetting] = useState(false);
  const [message, setMessage] = useState('');
  const [sockClient, setsockClient] = useState(() => {});
  const [chatDatas, setChatDatas] = useState([]);
  const [songs, setSongs] = useState();

  const accessToken = localStorage.getItem('accessToken');
  const [changeSong, setChangeSong] = useState(false);
  const [isAlbumCoverHover, setIsAlbumCoverHover] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [volume, setVolume] = useState(0);
  const [a, setA] = useState(0);
  const [playMusic, setPlayMusic] = useState(true);
  const [members, setMembers] = useState([]);
  const [nowPlaySong, setNowPlaySong] = useState([]);
  const [userNickName, setUserNickName] = useState();
  const [isEnd, setIsEnd] = useState(false);
  const [openMusicPlayList, setOpenMusicPlayList] = useState(false);
  const [nowPlayIndex, setnowPlayIndex] = useState(0);

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
  const nextSongHandler = () => {
    if (!isEnd) {
      axios
        .post(
          `http://15.165.199.44:8080/api/rooms/${roomid}/songs/next`,
          {
            videoId: nowPlaySong[0],
          },
          {
            headers: {
              Authorization: `${accessToken}`,
              accept: 'application/json',
            },
          }
        )
        .then((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://15.165.199.44:8080/api/rooms/${roomid}`, {
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
            setMembers(roomData.members);
            setUserNickName(userData.nickname);
            if (!roomData.members.includes(userData.nickname)) {
              const socket = new SockJS('http://15.165.199.44:8080/ws');
              const client = Stomp.over(socket);
              client.connect({}, () => {
                client.subscribe(`/sub/chat/room/${roomid}`, function (join) {
                  const receiveData = JSON.parse(join.body);
                  console.log(receiveData);
                  if (receiveData.type === 'SYSTEM') {
                    if (receiveData.message === 'NextSong') {
                      console.log(receiveData.message);
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
      .get(`http://15.165.199.44:8080/api/rooms/${roomid}/songs`, {
        headers: {
          Authorization: `${accessToken}`,
          accept: 'application/json',
        },
      })
      .then((e) => {
        const songData = e.data.data;
        console.log(songData);
        if (songData.nextSong.length === 0) {
          setIsEnd(true);
        }
        setnowPlayIndex(songData.pastSong.length);
        setSongs([
          ...songData.pastSong,
          songData.nowSong,
          ...songData.nextSong,
        ]);
        setNowPlaySong([
          songData.nowSong.videoId,
          songData.time,
          songData.nowSong.thumbnail,
        ]);
      });
  }, [changeSong]);

  return (
    <LiveroomContainer>
      {/* <Nav></Nav> */}
      {openSideBarSetting ? (
        <LiveroomPopup
          sockClient={sockClient}
          openSideBarSettingHandler={openSideBarSettingHandler}></LiveroomPopup>
      ) : null}
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${nowPlaySong[0]}?t=${nowPlaySong[1]}`}
        playing={true}
        muted={playMusic}
        width={0}
        volume={volume}
        onEnded={nextSongHandler}
      />
      <LiveroomMainBackground
        backgroundurl={nowPlaySong[2]}
        onMouseMove={(e) => {
          volumeHandler(e);
        }}
        onMouseUp={() => {
          setIsDrag(false);
          setA(volume);
        }}
        onClick={(e) => {
          setPlayMusic(false);
          if (!e.target.className.includes('disallow')) {
            setOpenMusicPlayList(false);
          }
        }}>
        {openMusicPlayList ? (
          <PlayList className='disallow'>
            <Swiper
              initialSlide={nowPlayIndex}
              className='swiper'
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 1000 }}>
              {songs.map((e) => {
                return <SwiperSlide key={e.videoId}>{e.title}</SwiperSlide>;
              })}
            </Swiper>
          </PlayList>
        ) : (
          <LiveroomCover>
            <LiveAlbumCover
              onMouseEnter={() => setIsAlbumCoverHover(true)}
              src={nowPlaySong[2]}></LiveAlbumCover>
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
                }}
                onDoubleClick={() => setOpenMusicPlayList(true)}>
                {volume === 0 ? (
                  <BsVolumeMute></BsVolumeMute>
                ) : (
                  Math.round(volume * 100)
                )}
              </LiveroomSoundBackground>
            ) : null}
          </LiveroomCover>
        )}
      </LiveroomMainBackground>
      <LiveroomSidebar
        setChangeSong={setChangeSong}
        roomid={roomid}
        members={members}
        message={message}
        setMessage={setMessage}
        sockClient={sockClient}
        chatDatas={chatDatas}
        openSideBarSettingHandler={openSideBarSettingHandler}
        songs={songs}
        userNickName={userNickName}></LiveroomSidebar>
    </LiveroomContainer>
  );
}

export default Liveroom;
