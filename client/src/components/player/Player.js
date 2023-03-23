import { useState, useRef } from 'react';
import { GoPlay } from 'react-icons/go';
import { MdSkipNext, MdPauseCircleFilled } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';

import {
  togglePlay,
  togglePause,
  fetchPrevSong,
  toNextSong,
  toPrevSong,
  storeCurrentSong,
} from '../../actions/actions';
import {
  PlayWarp,
  PlayerBtnContainer,
  PlayBox,
  PlayBoxonProgress,
} from '../../styles/player/player';

function Player({ volume }) {
  //플레이버튼
  const isPlaying = useSelector((state) => state?.isPlaying);
  //인덱스 불러오기
  const playIdx = useSelector((state) => state?.currentSongIdx);
  const dataUrl = useSelector(
    (state) => state?.currentSongList?.[playIdx]?.videoId
  );
  //리스트 불러오기
  const listLength = useSelector((state) => state?.currentSongList?.length);
  //진행도 표시
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  //플레이 버튼
  const handlePause = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      dispatch(togglePause());
    }
  };
  //Pause
  const handlePlay = (e) => {
    e.stopPropagation();
    dispatch(togglePause());
    if (listLength !== 0) {
      if (playIdx === null) {
        dispatch(fetchPrevSong());
      }
      dispatch(togglePlay());
    }
  };
  //Next
  const handleNext = (e) => {
    e.stopPropagation();
    if (playIdx === listLength - 1) {
      dispatch(togglePause());
      dispatch(storeCurrentSong());
    } else {
      dispatch(toNextSong());
    }
  };
  //Pre
  const handlePre = (e) => {
    e.stopPropagation();
    if (playIdx === 0) {
      dispatch(togglePause());
      dispatch(storeCurrentSong());
    } else {
      dispatch(toPrevSong());
    }
  };
  //진행도 전달
  const handlePlayBoxClick = (e) => {
    e.stopPropagation();
    const boxWidth = e.target.offsetWidth;
    const clickX = e.clientX - e.target.offsetLeft;
    const progressPercentage = (clickX / boxWidth) * 100;
    const newProgress = progressPercentage / 100;
    setProgress(newProgress);
    seekTo(newProgress);
  };
  const handleProgress = (state) => {
    setProgress(state.played);
  };
  const seekTo = (newProgress) => {
    playerRef.current.seekTo(newProgress);
  };
  return (
    <PlayWarp>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${dataUrl}`}
        playing={isPlaying}
        style={{ display: 'none' }}
        onProgress={handleProgress}
        volume={volume}
        ref={playerRef}
      />
      <PlayerBtnContainer>
        <MdSkipNext className='PreBtn' onClick={handlePre} />
        {isPlaying ? (
          <MdPauseCircleFilled className='PausetBtn' onClick={handlePause} />
        ) : (
          <GoPlay className='StartBtn' onClick={handlePlay} />
        )}
        <MdSkipNext className='NextBtn' onClick={handleNext} />
      </PlayerBtnContainer>
      <PlayBox onClick={handlePlayBoxClick}>
        <PlayBoxonProgress width={progress * 100} />
      </PlayBox>
    </PlayWarp>
  );
}

export default Player;
