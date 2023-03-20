import { PlaylistThumbnailContainer } from '../../styles/playlist';
import { BsPersonCircle } from 'react-icons/bs';
import onAirIcon from '../../assets/onAirIcon.png';

// main page에서 map 돌릴 컴포넌트
const PlaylistThumbnail = ({ playlist }) => {
  return (
    <PlaylistThumbnailContainer>
      <img
        src={playlist.thumbnail}
        alt='playlist thumbnail'
        className='playlistImg'
      />
      {playlist.isLive && (
        <img src={onAirIcon} alt='on Air icon' className='onAir' />
      )}
      <div className='title'>{playlist.title}</div>
      <div className='flexBox'>
        <div className='author'>
          <BsPersonCircle size='12px' />
          <div className='displayName'>{playlist.author}</div>
        </div>
      </div>
    </PlaylistThumbnailContainer>
  );
};

export default PlaylistThumbnail;
