import { SongListContainer, Song } from '../../../styles/playlist';

const SongList = ({ songList }) => {
  if (!songList) {
    return null;
  }
  return (
    <SongListContainer>
      {songList.slice(0, 10).map((song) => (
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
