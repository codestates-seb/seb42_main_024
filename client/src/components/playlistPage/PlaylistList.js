import { useState } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';

import { setPlaylist, togglePlay } from '../../actions/actions';
import { API } from '../../config';
import {
  PlaylistListContainerWrapper,
  PlaylistListContainer,
} from '../../styles/playlist';

const PlaylistList = ({ isEditing, playlistData, setPlaylistData }) => {
  const dispatch = useDispatch();
  // 삭제 기능을 위한 bool값을 저장하는 객체
  const defaultState = {};
  playlistData?.songList.forEach((song) => (defaultState[song.songId] = false));
  const [willBeDeleted, setWillBeDeleted] = useState(defaultState);

  // 곡 클릭하면 해당 곡부터 마지막 곡까지 플리에 저장
  const handleSongClick = (idx) => {
    dispatch(setPlaylist(playlistData.songList.slice(idx)));
    dispatch(togglePlay());
  };

  // 삭제 버튼 클릭
  const handleDeleteBtn = () => {
    // 한 곡이라도 클릭했을 경우
    const hasChange = Object.values(willBeDeleted).some((bool) => bool);
    if (hasChange) {
      const songList = playlistData.songList.filter(
        (song) => !willBeDeleted[song.songId]
      );
      const requestBody = {
        ...playlistData,
        songCount: songList.length,
        songList,
      };
      setPlaylistData(requestBody);
      // PATCH /playlist
      const storedAccessToken = localStorage.getItem('accessToken');
      axios.patch(`${API.PLAYLIST}/${playlistData.playlistId}`, requestBody, {
        headers: {
          Authorization: `${storedAccessToken}`,
          accept: 'application/json',
        },
      });
      // 삭제한 곡에 대한 정보 삭제
      playlistData?.songList.forEach((song) => {
        if (willBeDeleted[song.songId]) delete willBeDeleted[song.songId];
      });
    }
  };

  // 삭제할 곡 토글링
  const handleToggleDeleteBtn = (songId) => {
    const tmpObj = { ...willBeDeleted };
    tmpObj[songId] = !tmpObj[songId];
    setWillBeDeleted({ ...tmpObj });
  };

  return (
    <PlaylistListContainerWrapper>
      <PlaylistListContainer>
        {/* 열 제목 */}
        <div className='rowTitle'>
          <div className='num'>{`${playlistData?.songCount}곡`}</div>
          <div className='thumbnail'>썸네일</div>
          <div className='title'>제목</div>
          {isEditing && (
            <div className='deleteBtnWrapper'>
              <button className='deleteBtn' onClick={handleDeleteBtn}>
                삭제
              </button>
            </div>
          )}
        </div>
        {/* 노래 */}
        {playlistData?.songList.map((song, idx) => (
          <div
            key={song.videoId}
            className={willBeDeleted[song.songId] ? 'row checked' : 'row'}>
            <button className='songInfo' onClick={() => handleSongClick(idx)}>
              <div className='num'>{`${idx + 1}`}</div>
              <img
                src={song.thumbnail}
                alt='song thumbnail'
                className='thumbnail'
              />
              <div className='title'>{song.title}</div>
            </button>
            {isEditing && (
              <div className='selectDeleteWrapper'>
                <input
                  type='checkbox'
                  className='selectDelete'
                  value={willBeDeleted[song.songId]}
                  onClick={() => handleToggleDeleteBtn(song.songId)}
                />
              </div>
            )}
          </div>
        ))}
      </PlaylistListContainer>
    </PlaylistListContainerWrapper>
  );
};

export default PlaylistList;
