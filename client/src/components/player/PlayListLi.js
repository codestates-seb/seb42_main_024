import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { GiPauseButton } from 'react-icons/gi';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCurrentSongIdx,
  togglePause,
  togglePlay,
  deleteSong,
} from '../../actions/actions';
import {
  PlayListBox,
  PlayListLiContainer,
  PlayListLiCover,
  PlayListLiTitle,
  PlayListLiContentBox,
  PlayListTimeBox,
  PlayListDelete,
} from '../../styles/player/playlistli';
function PlayListLi({ data, index }) {
  //시간
  const [duration, setDuration] = useState(null);
  const minutes = Math.floor(duration / 60);
  const formattedSeconds = (duration % 60).toString().padStart(2, '0');
  //플레이 인포
  const [isHover, setIsHover] = useState(false);
  const currentSongIdx = useSelector((state) => state.currentSongIdx);
  const isPlaying = useSelector((state) => state.isPlaying);
  //플레이
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const handleSwitchPlayer = () => {
    dispatch(setCurrentSongIdx(index));
  };
  //플레이 컨트롤
  const handlePlayControl = () => {
    if (index === currentSongIdx) {
      dispatch(togglePause());
      if (isPlaying === false) {
        dispatch(togglePlay());
      }
    } else {
      dispatch(setCurrentSongIdx(index));
    }
  };
  const handleDeleteSong = (songId) => {
    dispatch(deleteSong(songId));
  };
  return (
    <PlayListBox>
      <PlayListLiContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isPlaying={isPlaying}
        index={index}
        currentSongIdx={currentSongIdx}>
        <ReactPlayer
          key={index}
          url={`https://www.youtube.com/watch?v=${data.videoId}`}
          style={{ display: 'none' }}
          onDuration={setDuration}
        />
        <PlayListLiCover src={data.thumbnail} onClick={handleSwitchPlayer} />
        {index === currentSongIdx ? (
          isPlaying ? (
            <GiPauseButton className='PauseBtn' onClick={handlePlayControl} />
          ) : (
            <FaPlay className='PlayBtn' onClick={handlePlayControl} />
          )
        ) : (
          <FaPlay className='PlayBtn' onClick={handlePlayControl} />
        )}
        <PlayListLiContentBox>
          <PlayListLiTitle>{data.title}</PlayListLiTitle>
        </PlayListLiContentBox>
        <PlayListTimeBox>
          {isHover ? (
            <PlayListDelete
              className='hover-text'
              onClick={() => handleDeleteSong(data.songId)}>
              x
            </PlayListDelete>
          ) : (
            <p className='time'>{`${minutes}:${formattedSeconds}`}</p>
          )}
        </PlayListTimeBox>
      </PlayListLiContainer>
    </PlayListBox>
  );
}

export default PlayListLi;
