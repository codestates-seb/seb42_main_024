import { useDispatch } from 'react-redux';

import { setPlaylist, togglePlay } from '../../actions/actions';
import {
  PlaylistListContainerWrapper,
  PlaylistListContainer,
} from '../../styles/playlist';

const PlaylistList = ({ playlist }) => {
  const dispatch = useDispatch();
  const handleSongClick = (idx) => {
    dispatch(setPlaylist(playlist.slice(idx)));
    dispatch(togglePlay());
  };
  return (
    <PlaylistListContainerWrapper>
      <PlaylistListContainer>
        <div className='row'>
          <div className='num'>{`${playlist.length}곡`}</div>
          <div className='title'>제목</div>
          <div className='artist'>아티스트</div>
          <div className='album'>앨범</div>
          <div className='playtime'>{playlist.totalPlayTime}</div>
        </div>
        {playlist.map((song, idx) => (
          <button
            key={song.id}
            className='row'
            onClick={() => handleSongClick(idx)}>
            <div className='num'>{`${idx + 1}`}</div>
            <div className='title'>{song.title}</div>
            <div className='artist'>{song.artist}</div>
            <div className='album'>{''}</div>
            <div className='playtime'>{song.playtime}</div>
          </button>
        ))}
      </PlaylistListContainer>
    </PlaylistListContainerWrapper>
  );
};

export default PlaylistList;
