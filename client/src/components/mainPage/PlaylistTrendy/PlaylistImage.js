import { TbPlayerPlay, TbPlayerPause } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';

import { setPlaylist, togglePlay, togglePause } from '../../../actions/actions';
import { PlaylistImageContainer } from '../../../styles/playlist';

const PlaylistImage = ({ trendyBoard, trendyList }) => {
  const isPlaying = useSelector((state) => state?.isPlaying);
  const dispatch = useDispatch();

  const handlePlayBtnClick = () => {
    dispatch(setPlaylist(trendyList.songList));
    if (!isPlaying) {
      dispatch(togglePlay());
    } else {
      dispatch(togglePause());
    }
  };

  return (
    <PlaylistImageContainer>
      <img
        src={trendyBoard.boardThumb}
        alt='playlist thumbnail'
        className={isPlaying ? '' : 'blurred'}
      />
      <button className='playBtn' onClick={handlePlayBtnClick}>
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
