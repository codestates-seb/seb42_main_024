import { useEffect, useState } from 'react';
import { BsVolumeMute } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import * as SockJS from 'sockjs-client';
import { Swiper, SwiperSlide } from 'swiper/react';

import { togglePause } from '../actions/actions';
import LiveroomPopup from '../components/liveroom/LiveroomPopup';
import LiveroomSidebar from '../components/liveroom/LiveroomSideBar';
import { API } from '../config';
import {
  LiveroomGuide,
  LiveroomContainer,
  LiveroomCover,
  LiveAlbumCover,
  LiveroomMainBackground,
  LiveroomSoundBackground,
  PlayList,
  PlayThumbnail,
  PlaySongTitle,
  PlayThumbnailContainer,
  ProgessContinaer,
  CDShape,
  LiveroomEndContainer,
  LiveroomEndText,
} from '../styles/liveroom';
import 'animate.css';

function Liveroom() {
  const dispatch = useDispatch();
  dispatch(togglePause());
  const { liveroomid } = useParams();
  const history = createBrowserHistory();
  const navigate = useNavigate();
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
  const [roomOwner, setRoomOwner] = useState('');
  const [members, setMembers] = useState([]);
  const [nowPlaySong, setNowPlaySong] = useState([]);
  const [userNickName, setUserNickName] = useState();
  const [isEnd, setIsEnd] = useState(false);
  const [openMusicPlayList, setOpenMusicPlayList] = useState(false);
  const [nowPlayIndex, setnowPlayIndex] = useState(0);
  const [readyToPlayMusic, setReadyToPlayMusic] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [openLiveroomGuide, setOpenLiveroomGuide] = useState(true);
  const [isDone, setIsDone] = useState(false);

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
  const nextSongHandler = (elsevalue) => {
    const realIsEnd = elsevalue || isEnd;
    if (!realIsEnd) {
      setIsEnd(false);
      axios
        .post(
          `${API.LIVEROOM}/${roomid}/songs/next`,
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
        .then(() => {
          setIsDone(false);
        });
    } else {
      setIsDone(true);
    }
  };

  useEffect(() => {
    axios
      .get(`${API.LIVEROOM}/${roomid}`, {
        headers: {
          Authorization: `${accessToken}`,
          accept: 'application/json',
        },
      })
      .then((e) => {
        axios
          .get(`${API.MEMBER}/auth`, {
            headers: {
              Authorization: `${accessToken}`,
              accept: 'application/json',
            },
          })
          .then((user) => {
            const userData = user.data;
            const roomData = e.data.data;
            setMembers(roomData.members);
            setRoomOwner(roomData.owner);
            setUserNickName(userData.nickname);

            if (!roomData.members.includes(userData.nickname)) {
              const socket = new SockJS('http://15.165.199.44:8080/ws');
              const client = Stomp.over(socket);
              client.connect({}, () => {
                client.subscribe(`/sub/chat/room/${roomid}`, function (join) {
                  const receiveData = JSON.parse(join.body);
                  if (receiveData.type === 'SYSTEM') {
                    if (receiveData.message === 'NextSong') {
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
              navigate('/');
            }
          });
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API.LIVEROOM}/${roomid}/songs`, {
        headers: {
          Authorization: `${accessToken}`,
          accept: 'application/json',
        },
      })
      .then((e) => {
        const songData = e.data.data;
        if (songData.nextSong.length === 0) {
          setIsEnd(true);
        } else {
          setIsEnd(false);
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
          songData.nowSong,
        ]);
      });
  }, [changeSong]);

  useEffect(() => {
    if (readyToPlayMusic) {
      history.listen(() => {
        sockClient.disconnect();
      });
    }
  }, [readyToPlayMusic]);

  return (
    <LiveroomContainer>
      {openLiveroomGuide ? (
        <LiveroomGuide
          onClick={() => {
            if (readyToPlayMusic) {
              setPlayMusic(false);
              setOpenLiveroomGuide(false);
            }
          }}></LiveroomGuide>
      ) : null}
      {openSideBarSetting ? (
        <LiveroomPopup
          accessToken={accessToken}
          roomid={roomid}
          userNickName={userNickName}
          roomOwner={roomOwner}
          sockClient={sockClient}
          openSideBarSettingHandler={openSideBarSettingHandler}></LiveroomPopup>
      ) : null}
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${nowPlaySong[0]}?t=${nowPlaySong[1]}`}
        playing={true}
        muted={playMusic}
        width={0}
        volume={volume}
        onReady={() => {
          setReadyToPlayMusic(true);
        }}
        onProgress={(e) => {
          setSongProgress((e.played.toFixed(4) * 100).toFixed(2));
        }}
        onEnded={nextSongHandler}
      />
      <LiveroomMainBackground
        className='allow'
        backgroundurl={nowPlaySong[2]}
        onMouseMove={(e) => {
          volumeHandler(e);
        }}
        onMouseUp={() => {
          setIsDrag(false);
          setA(volume);
        }}
        onClick={(e) => {
          if (e.target.className.includes('allow')) {
            setOpenMusicPlayList(false);
          }
        }}>
        {openMusicPlayList ? (
          <PlayList>
            <Swiper
              initialSlide={nowPlayIndex}
              className='swiper'
              spaceBetween={50}
              slidesPerView={1}
              scrollbar={{ draggable: true }}
              autoplay={{ delay: 1000 }}>
              {songs.map((e) => {
                return (
                  <SwiperSlide key={e.videoId}>
                    <PlayThumbnail src={e.thumbnail}></PlayThumbnail>
                    <PlaySongTitle>{e.title}</PlaySongTitle>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </PlayList>
        ) : (
          <LiveroomCover>
            <PlayThumbnailContainer>
              <LiveAlbumCover
                className={isDone ? 'done' : null}
                onMouseEnter={() => setIsAlbumCoverHover(true)}
                src={nowPlaySong[2]}></LiveAlbumCover>
              <ProgessContinaer
                bgrColor='red'
                songProgress={songProgress}
                zIndex={4}></ProgessContinaer>
              <ProgessContinaer
                songProgress={100}
                bgrColor={'var(--color9)'}
                zIndex={3}></ProgessContinaer>
              <CDShape></CDShape>
            </PlayThumbnailContainer>
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
        {isDone ? (
          <LiveroomEndContainer>
            <LiveroomEndText>노래가 종료되었습니다</LiveroomEndText>
          </LiveroomEndContainer>
        ) : null}
      </LiveroomMainBackground>
      <LiveroomSidebar
        roomOwner={roomOwner}
        nowPlaySong={nowPlaySong}
        nextSongHandler={nextSongHandler}
        setChangeSong={setChangeSong}
        roomid={roomid}
        members={members}
        setMembers={setMembers}
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
