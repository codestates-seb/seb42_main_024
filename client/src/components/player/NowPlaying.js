import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import PlayBox from './PlayBox';
import Player from './Player';
import PlayList from './PlayList';
import Volume from './Volume ';

import Logo from '../../assets/Logo.png';
import {
  PlayWarp,
  NowPlayingWrap,
  PlayListBox,
  PlayListCover,
  PlayListImg,
} from '../../styles/player/nowplaying';

function NowPlaying() {
  const playIdx = useSelector((state) => state?.currentSongIdx);
  const dataUrl = useSelector(
    (state) => state?.currentSongList?.[playIdx]?.thumbnail
  );
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(1);
  //볼륨 컴포넌트에 전달
  const handleVolumeChange = (VolumeValue) => {
    setVolume(VolumeValue);
  };
  const handlePlayList = () => {
    setIsOpen((pre) => !pre);
  };
  return (
    <PlayWarp>
      {/* NowPlaying */}
      <NowPlayingWrap
        onClick={handlePlayList}
        className={location.pathname.includes('liverooms') ? 'hide' : ''}>
        <PlayBox />
        <Player volume={volume} />
        <Volume volume={volume} onVolumeChange={handleVolumeChange} />
      </NowPlayingWrap>
      {/* PlayList */}
      <PlayListBox isOpen={isOpen}>
        <PlayListCover>
          {dataUrl ? (
            <PlayListImg src={dataUrl} />
          ) : (
            <img src={Logo} alt='logo' className='logo' />
          )}
        </PlayListCover>
        <PlayList />
      </PlayListBox>
    </PlayWarp>
  );
}

export default NowPlaying;
