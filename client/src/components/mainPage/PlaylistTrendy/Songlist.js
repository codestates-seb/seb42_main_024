import { SongListContainer, Song } from '../../../styles/playlist';

const SongList = ({ songlist }) => {
  return (
    <SongListContainer>
      {songlist.map((song) => (
        <Song key={song.Id}>
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
