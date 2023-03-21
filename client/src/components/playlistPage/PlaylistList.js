import { PlaylistListContainer } from '../../styles/playlist';

const PlaylistList = ({ playlist }) => {
  const handleSongClick = (song) => {
    const newURL = `https://www.youtube.com/watch?v=${song.youtubeKey}`;
    window.open(newURL);
  };
  return (
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
          onClick={() => handleSongClick(song)}>
          <div className='num'>{`${idx + 1}`}</div>
          <div className='title'>{song.title}</div>
          <div className='artist'>{song.artist}</div>
          <div className='album'>{''}</div>
          <div className='playtime'>{song.playtime}</div>
        </button>
      ))}
    </PlaylistListContainer>
  );
};

export default PlaylistList;
