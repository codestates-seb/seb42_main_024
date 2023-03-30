import { SongListContainer, Song } from '../../../styles/playlist';

const SongList = ({ songList }) => {
  if (!songList) {
    return null;
  }

  const rowCount = songList.length < 5 ? 1 : songList.length < 9 ? 2 : 3;

  return (
    <SongListContainer rowCount={rowCount}>
      {songList.slice(0, 12).map((song) => (
        <Song key={song.songId}>
          <img src={song.thumbnail} alt='song thumbnail' />
          <div className='info'>
            <div className='title'>{song.title}</div>
          </div>
        </Song>
      ))}
    </SongListContainer>
  );
};

export default SongList;
