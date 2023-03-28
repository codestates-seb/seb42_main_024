import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { PlaylistThumbnailContainer } from '../../styles/playlist';

// main page에서 map 돌릴 컴포넌트
const PlaylistThumbnail = ({ playlist }) => {
  return (
    <>
      <PlaylistThumbnailContainer key={playlist.playlistId}>
        <Link to={`/playlists/${playlist.playlistId}`}>
          <img
            src={playlist.boardThumb}
            alt='playlist thumbnail'
            className='playlistImg'
          />
          <div className='title'>{playlist.boardTitle}</div>
          <div className='flexBox'>
            <div className='author'>
              <BsPersonCircle size='12px' />
              <div className='displayName'>{playlist.nickname}</div>
            </div>
          </div>
        </Link>
      </PlaylistThumbnailContainer>
    </>
  );
};

export default React.memo(PlaylistThumbnail);
