import { useState } from 'react';
import { GoPlay } from 'react-icons/go';
import { MdSkipNext, MdPauseCircleFilled } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentSongURL } from '../../actions/actions';
import {
  PlayWarp,
  PlayerBtnContainer,
  PlayBox,
  PlayBoxonProgress,
} from '../../styles/player/player';
function Player({ volume }) {
  //플레이버튼
  const [isPlaying, setIsPlaying] = useState(false);
  const data = useSelector((state) => state.currentSongURL);
  //진행도 표시
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  //플레이 버튼
  const handlePlay = (e) => {
    e.stopPropagation();
    setIsPlaying((pre) => !pre);
  };
  //진행도 전달
  const handleProgress = (state) => {
    setProgress(state?.played);
  };
  const test = (e) => {
    e.stopPropagation();
    dispatch(setCurrentSongURL(`https://www.youtube.com/watch?v=Y8JFxS1HlDo`));
  };
  return (
    <PlayWarp>
      <ReactPlayer
        url={data}
        playing={isPlaying}
        style={{ display: 'none' }}
        onProgress={handleProgress}
        volume={volume}
      />
      <PlayerBtnContainer>
        <MdSkipNext className='PreBtn' />
        {isPlaying ? (
          <MdPauseCircleFilled className='PausetBtn' onClick={handlePlay} />
        ) : (
          <GoPlay className='StartBtn' onClick={handlePlay} />
        )}
        <MdSkipNext className='NextBtn' onClick={test} />
      </PlayerBtnContainer>
      <PlayBox>
        <PlayBoxonProgress width={progress * 100} />
      </PlayBox>
    </PlayWarp>
  );
}

export default Player;
