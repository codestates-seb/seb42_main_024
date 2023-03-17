import { useState } from 'react';
import { GoPlay } from 'react-icons/go';
import { MdSkipNext, MdPauseCircleFilled } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

import { setCurrentSongURL } from '../../actions/actions';
import {
  PlayWarp,
  PlayerBtnContainer,
  PlayBox,
  PlayBoxonProgress,
} from '../../styles/player';

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const data = useSelector((state) => state.currentSongURL);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  // console.log('data', data);
  const handlePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };
  const handleProgress = (state) => {
    setProgress(state.played);
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
