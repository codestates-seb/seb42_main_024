import styled from 'styled-components';
import { GoPlay } from 'react-icons/go';
import { MdSkipNext, MdPauseCircleFilled } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { setCurrentSongURL } from '../../actions/actions';
const PlayWarp = styled.div`
  width: 654px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 4.2vw;
`;
const PlayerBtnContainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  color: var(--color7);
  margin-bottom: 10px;
  .PreBtn {
    height: 30px;
    width: 30px;
    cursor: pointer;
    transform: scaleX(-1);
  }
  .NextBtn {
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
  .StartBtn {
    width: 50px;
    height: 35px;
    cursor: pointer;
  }
  .PausetBtn {
    width: 50px;
    height: 35px;
    cursor: pointer;
  }
`;
const PlayBox = styled.div`
  width: 600px;
  height: 5px;
  background-color: var(--color7);
  border-radius: 3px;
`;
const PlayBoxonProgress = styled.div`
  width: ${(props) => props.width || 0}%;
  height: 100%;
  background-color: var(--color10);
  border-radius: 3px;
`;
function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const data = useSelector((state) => state.currentSongURL);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  console.log('data', data);
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
