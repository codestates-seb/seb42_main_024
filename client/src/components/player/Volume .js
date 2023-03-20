import { useState } from 'react';
import { BsFillVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';

import { VolumeWarp, VolumeBarControl } from '../../styles/player/volume';
function Volume({ volume, onVolumeChange }) {
  //볼륨값 저장
  const [prevVolume, setPrevVolume] = useState(volume);
  //볼륨조절
  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVolume = parseFloat(e.target.value);
    setPrevVolume(volume);
    onVolumeChange(newVolume);
  };
  //뮤트
  const handleVolumeMute = (e) => {
    e.stopPropagation();
    setPrevVolume(volume);
    onVolumeChange(0);
  };
  //언뮤트
  const handleVolumeUnmute = (e) => {
    e.stopPropagation();
    onVolumeChange(prevVolume);
  };
  return (
    <VolumeWarp>
      {volume === 0 ? (
        <BsFillVolumeMuteFill className='Volume' onClick={handleVolumeUnmute} />
      ) : (
        <BsFillVolumeDownFill className='Volume' onClick={handleVolumeMute} />
      )}
      <VolumeBarControl
        className='VolumeBarControl'
        type='range'
        min='0'
        max='1'
        step='0.01'
        value={volume}
        volume={volume}
        onChange={handleVolumeChange}
      />
    </VolumeWarp>
  );
}

export default Volume;
