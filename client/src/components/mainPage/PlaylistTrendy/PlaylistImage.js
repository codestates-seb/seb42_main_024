import { useState } from 'react';
import { TbPlayerPlay, TbPlayerPause } from 'react-icons/tb';

import { PlaylistImageContainer } from '../../../styles/playlist';

const PlaylistImage = ({ playlist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <PlaylistImageContainer>
      <img
        src={playlist.thumbnail}
        alt='playlist thumbnail'
        className={isPlaying ? '' : 'blurred'}
      />
      <button className='playBtn' onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <TbPlayerPause className='icon' size='50px' />
        ) : (
          <TbPlayerPlay className='icon' size='50px' />
        )}
      </button>
    </PlaylistImageContainer>
  );
};

export default PlaylistImage;
