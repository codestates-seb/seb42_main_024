import 'animate.css';
import { useRef, useState } from 'react';
import { MdClose, MdOutlineLibraryMusic } from 'react-icons/md';
// import { useSelector } from 'react-redux';

import axios from 'axios';

import { PlaylistCreatorContainer } from '../../../styles/createroom';
import LiveSearchUI from '../CreateLiveRoom/LiveSearchUI';

const CreateLiveRoom = ({ isCreateLiveRoom, setIsCreateLiveRoom }) => {
  // ref
  const titleRef = useRef(null);
  const descRef = useRef(null);
  // 추가된 곡으로 구성된 플레이리스트
  const [playlistId, setPlaylistId] = useState([]);
  // 빈 songList로 플리 만들기를 시도할 때의 알림 모달 창
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // const user = useSelector((state) => state.user);

  // 플리 만들기 버튼 클릭
  const handlePostLiveRoom = () => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (playlistId.length !== 0) {
      const requestBody = {
        playlist: {
          title: titleRef.current.value,
          playlistId,
        },
      };
      const requestHeader = {
        headers: {
          Authorization: `${storedAccessToken}`,
          accept: 'application/json',
        },
      };

      axios
        .post('http://15.165.199.44:8080/api/rooms', requestBody, requestHeader)
        .catch(console.log);
      closePlaylistCreator();
    } else {
      setIsAlertModalOpen(true);
      setTimeout(() => {
        setIsAlertModalOpen(false);
      }, 1000);
    }
  };

  // 플리 만들기 창이 닫힐 때, 값들 초기화
  const closePlaylistCreator = () => {
    titleRef.current.value = '';
    descRef.current.value = '';
    setIsCreateLiveRoom('close');
  };

  return (
    <PlaylistCreatorContainer
      className={
        isCreateLiveRoom === 'default'
          ? 'dpNone'
          : isCreateLiveRoom === 'open'
          ? 'animate__animated animate__fadeInLeftBig'
          : 'animate__animated animate__fadeOutLeftBig'
      }>
      <div className='create-or-close'>
        <MdOutlineLibraryMusic className='livebtn' />
        <button className='create' onClick={handlePostLiveRoom}>
          라이브룸
        </button>
        <MdClose className='closeIcon' onClick={closePlaylistCreator} />
      </div>
      <input
        type='text'
        ref={titleRef}
        className='title'
        placeholder='라이브 룸 타이틀'
      />
      <textarea
        type='text'
        ref={descRef}
        className='desc'
        placeholder='간단한 설명을 적어주세요...'
      />
      <LiveSearchUI
        playlistId={playlistId}
        setPlaylistId={setPlaylistId}
        isOpenPlaylistCreator={isCreateLiveRoom}
      />
      {/* 빈 songList로 플리 만들기를 시도할 때의 알림 모달 창 */}
      {isAlertModalOpen && (
        <div className='alertModal'>빈 플레이리스트입니다</div>
      )}
    </PlaylistCreatorContainer>
  );
};

export default CreateLiveRoom;
