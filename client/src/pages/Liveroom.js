import { useEffect, useState } from 'react';
import { BsVolumeMute } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import * as SockJS from 'sockjs-client';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';

import { togglePause } from '../actions/actions';
import liveChat from '../assets/liveChat.gif';
import livePlayListCheck from '../assets/livePlayListCheck.gif';
import Logo from '../assets/Logo.png';
import volumeControl from '../assets/volumeControl.gif';
import axiosCall from '../axios/axiosCall';
import LiveroomGuider from '../components/liveroom/LiveroomGuider';
import LiveroomPopup from '../components/liveroom/LiveroomPopup';
import LiveroomSidebar from '../components/liveroom/LiveroomSideBar';
import { API } from '../config';
import {
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
  LiveroomGuide,
  LiveroomGuideview,
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
  const [volume, setVolume] = useState(0.5);
  const [volumeControlValue, setVolumeControlValue] = useState(0.5);
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
  const [isDone, setIsDone] = useState(false);
  const [openGuideMenu, setOpenGuideMenu] = useState(
    true && !localStorage.getItem('wasOpenGuideMenu')
  );
  const liveroomGuideData = [
    {
      key: 'logo',
      img: Logo,
      text: 'Liveroom에 오신것을 환영합니다!!',
    },
    {
      key: 'volumeControl',
      img: volumeControl,
      text: `드래그를 통해
      볼륨을 조절할 수 있습니다.`,
    },
    {
      key: 'livePlayListCheck',
      img: livePlayListCheck,
      text: `더블 클릭시
      현재 플레이리스트를 볼 수 있습니다.`,
    },
    {
      key: 'liveChat',
      img: liveChat,
      text: `채팅으로
      방에 있는 사람들과 소통해보세요 !`,
    },
  ];

  const volumeHandler = (e) => {
    if (isDrag && readyToPlayMusic) {
      setVolume(() => {
        const value = volumeControlValue + (isDrag - e.clientY) / 350;
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
      axiosCall(`${API.LIVEROOM}/${roomid}/songs/next`, 'post', {
        videoId: nowPlaySong[0],
      }).then(() => {
        setIsDone(false);
      });
    } else {
      setIsDone(true);
    }
  };

  useEffect(() => {
    axiosCall(`${API.LIVEROOM}/${roomid}`, 'get')
      .then((e) => {
        if (e === 'out') {
          navigate('/');
        }
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
                    } else if (
                      receiveData.message === 'Full' &&
                      receiveData.memberName === userData.nickname
                    ) {
                      alert(`방의 인원이 초과되었습니다.`);
                      navigate('/');
                    } else if (receiveData.message === 'ChatroomOver') {
                      alert(`방장이 방을 삭제했습니다.`);
                      navigate('/');
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
              alert(`이미 참여중인 방입니다`);
              navigate('/');
            }
          });
      })
      .catch(() => {
        alert('이미 삭제된 방 입니다.');
      });
  }, []);

  useEffect(() => {
    axiosCall(`${API.LIVEROOM}/${roomid}/songs`, 'get').then((e) => {
      const songData = e.data.data;
      if (songData.nextSong.length === 0) {
        setIsEnd(true);
      } else {
        setIsEnd(false);
      }
      setnowPlayIndex(songData.pastSong.length);
      setSongs([...songData.pastSong, songData.nowSong, ...songData.nextSong]);
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
        sockClient?.disconnect();
      });
    }
  }, [readyToPlayMusic]);

  return (
    <LiveroomContainer
      onClick={() => {
        if (readyToPlayMusic) {
          setPlayMusic(false);
        }
      }}>
      {openGuideMenu ? (
        <LiveroomGuide
          className='allow'
          onMouseDown={(e) => {
            if (readyToPlayMusic) {
              localStorage.setItem('wasOpenGuideMenu', readyToPlayMusic);
              setPlayMusic(false);
              if (e.target.className?.includes('allow')) {
                setOpenGuideMenu(false);
              }
            }
          }}>
          <LiveroomGuideview>
            <Swiper
              modules={[Pagination]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}>
              {liveroomGuideData.map((e) => {
                return (
                  <SwiperSlide key={e.key}>
                    <LiveroomGuider guideData={e}></LiveroomGuider>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </LiveroomGuideview>
        </LiveroomGuide>
      ) : null}
      {openSideBarSetting ? (
        <LiveroomPopup
          roomid={roomid}
          userNickName={userNickName}
          roomOwner={roomOwner}
          sockClient={sockClient}
          openSideBarSettingHandler={openSideBarSettingHandler}></LiveroomPopup>
      ) : null}
      {nowPlaySong[0] ? (
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
      ) : null}
      <LiveroomMainBackground
        className='allow'
        backgroundurl={nowPlaySong[2]}
        onMouseMove={(e) => {
          volumeHandler(e);
        }}
        onMouseUp={() => {
          setIsDrag(false);
          setVolumeControlValue(volume);
        }}
        onClick={(e) => {
          if (typeof e?.target?.className === 'object') {
            setOpenMusicPlayList(false);
          } else if (
            e?.target?.className?.includes('allow') &&
            readyToPlayMusic
          ) {
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
                  setVolumeControlValue(volume);
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
        setOpenGuideMenu={setOpenGuideMenu}
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
