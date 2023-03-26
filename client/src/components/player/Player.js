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
  toTheTop,
  toTheFront,
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
  const [isSeeking, setIsSeeking] = useState(false);
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
    if (playIdx !== null) {
      dispatch(togglePause());
      if (listLength !== 0) {
        if (playIdx === null) {
          dispatch(fetchPrevSong());
        }
        dispatch(togglePlay());
      }
    }
  };
  //Next
  const handleNext = (e) => {
    e.stopPropagation();
    if (playIdx === listLength - 1) {
      dispatch(storeCurrentSong());
      dispatch(toTheFront());
    } else {
      dispatch(toNextSong());
    }
    if (listLength === 1) {
      seekTo(0);
    }
  };
  //Pre
  const handlePre = (e) => {
    e.stopPropagation();
    if (playIdx === 0) {
      dispatch(storeCurrentSong());
      dispatch(toTheTop());
    } else {
      dispatch(toPrevSong());
    }
    if (listLength === 1) {
      seekTo(0);
    }
  };
  //진행도 전달
  const handlePlayBoxClick = (e) => {
    e.stopPropagation();

    // PlayBox 영역 내에서만 클릭한 경우에만 처리
    const boxWidth = e.currentTarget.offsetWidth;
    const clickX = e.clientX - e.currentTarget.offsetLeft;

    // PlayBox 영역 내에서 클릭한 경우에만 progress 값을 변경합니다.
    if (clickX >= 0 && clickX <= boxWidth) {
      const progressPercentage = (clickX / boxWidth) * 100;
      const newProgress = progressPercentage / 100;
      setProgress(newProgress);
      seekTo(newProgress);
    }
  };
  const handlePlayBoxMouseDown = (e) => {
    e.stopPropagation();
    setIsSeeking(true);
  };

  const handlePlayBoxMouseUp = (e) => {
    e.stopPropagation();
    setIsSeeking(false);
  };

  const handlePlayBoxMouseMove = (e) => {
    e.stopPropagation();
    if (!isSeeking) {
      return;
    }
    const boxWidth = e.currentTarget.offsetWidth;
    const clickX = e.clientX - e.currentTarget.offsetLeft;
    if (clickX >= 0 && clickX <= boxWidth) {
      const progressPercentage = (clickX / boxWidth) * 100;
      const newProgress = progressPercentage / 100;
      setProgress(newProgress);
      seekTo(newProgress);
    }
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
      <PlayBox
        onClick={handlePlayBoxClick}
        onMouseDown={handlePlayBoxMouseDown}
        onMouseUp={handlePlayBoxMouseUp}
        onMouseMove={handlePlayBoxMouseMove}>
        <PlayBoxonProgress width={progress * 100} />
      </PlayBox>
    </PlayWarp>
  );
}

export default Player;
