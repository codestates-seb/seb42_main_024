import 'animate.css';
import { useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';

// import axios from 'axios';

import SearchUI from './SearchUI';

import { PlaylistCreatorContainer } from '../../../styles/playlistCreator';

const PlaylistCreator = ({
  isOpenPlaylistCreator,
  setIsOpenPlaylistCreator,
}) => {
  // ref
  const titleRef = useRef(null);
  const descRef = useRef(null);
  // 추가된 곡으로 구성된 플레이리스트
  const [songList, setSongList] = useState([]);
  // 빈 songList로 플리 만들기를 시도할 때의 알림 모달 창
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // 플리 만들기 버튼 클릭
  const handleCreatePlaylist = () => {
    if (songList.length !== 0) {
      // 플레이리스트 생성 POST 코드
      const requestBody = {
        memberId: 1,
        boardTitle: titleRef.current.value,
        boardContent: descRef.current.value,
        boardThumb: songList[0].thumbnail,
        playlistId: null,
        playlist: {
          title: titleRef.current.value,
          songList,
        },
      };
      console.log(requestBody);
      //   axios
      //     .post('http://15.165.199.44:8080/api/boards', requestBody)
      //     .catch(console.log);
      // 만들고 나서 상태 초기화
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
    setIsOpenPlaylistCreator('close');
  };

  return (
    <PlaylistCreatorContainer
      className={
        isOpenPlaylistCreator === 'default'
          ? 'dpNone'
          : isOpenPlaylistCreator === 'open'
          ? 'animate__animated animate__fadeInLeftBig'
          : 'animate__animated animate__fadeOutLeftBig'
      }>
      <div className='create-or-close'>
        <button className='create' onClick={handleCreatePlaylist}>
          플레이리스트 만들기
        </button>
        <MdClose className='closeIcon' onClick={closePlaylistCreator} />
      </div>
      <input
        type='text'
        ref={titleRef}
        className='title'
        placeholder='플레이리스트 제목'
      />
      <textarea
        type='text'
        ref={descRef}
        className='desc'
        placeholder='간단한 설명을 적어주세요...'
      />
      <SearchUI
        songList={songList}
        setSongList={setSongList}
        isOpenPlaylistCreator={isOpenPlaylistCreator}
      />
      {/* 빈 songList로 플리 만들기를 시도할 때의 알림 모달 창 */}
      {isAlertModalOpen && (
        <div className='alertModal'>빈 플레이리스트입니다</div>
      )}
    </PlaylistCreatorContainer>
  );
};

export default PlaylistCreator;
