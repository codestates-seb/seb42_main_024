import { PlaylistThumnailContainer } from '../../styles/playlist';
import { BsPersonCircle } from 'react-icons/bs';
import onAirIcon from '../../assets/onAirIcon.png';
import PropTypes from 'prop-types';

// main page에서 map 돌릴 컴포넌트
const PlaylistThumbnail = ({
  playlistImgSrc,
  isLive,
  playlistTitle,
  playlistTotalTime,
  playlistAuthor,
}) => {
  return (
    <PlaylistThumnailContainer>
      <img
        src={playlistImgSrc}
        alt='playlist thumbnail'
        className='playlistImg'
      />
      {isLive && <img src={onAirIcon} alt='on Air icon' className='onAir' />}
      <div className='title'>{playlistTitle}</div>
      <div className='flexBox'>
        <div className='playtime'>{playlistTotalTime}</div>
        <div className='author'>
          <BsPersonCircle size='12px' />
          <div className='displayName'>{playlistAuthor}</div>
        </div>
      </div>
    </PlaylistThumnailContainer>
  );
};

PlaylistThumbnail.propTypes = {
  isLive: PropTypes.bool,
  playlistImgSrc: PropTypes.string,
  playlistTitle: PropTypes.string,
  playlistAuthor: PropTypes.string,
  playlistTotalTime: PropTypes.string,
};

export default PlaylistThumbnail;
