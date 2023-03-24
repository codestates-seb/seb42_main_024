import { SongListContainer, Song } from '../../../styles/playlist';

const SongList = ({ songlist }) => {
  return (
    <SongListContainer>
      {songlist.slice(0, 10).map((song) => (
        <Song key={song.id}>
          <img src={song.imgSrc} alt='song thumbnail' />
          <div className='info'>
            <div className='title'>{song.title}</div>
            <div className='artist'>{song.artist}</div>
          </div>
        </Song>
      ))}
    </SongListContainer>
  );
};

export default SongList;
