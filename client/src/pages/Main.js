import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import PlaylistThumbnail from '../components/mainPage/PlaylistThumbnail';
import PlaylistTrendy from '../components/mainPage/PlaylistTrendy';
import { MainContent, StyledSlider } from '../styles/main';

const Main = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); //eslint-disable-line no-unused-vars

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 4,
    swipeToSlide: true,
    afterChange: (idx) => {
      setCurrentIndex(idx);
    },
  };

  useEffect(() => {
    const getPlaylist = async () => {
      const playlist = await axios.get('http://localhost:3001/playlist');
      setPlaylist(playlist.data);
    };
    getPlaylist();
  }, []);

  return (
    <MainContent>
      {playlist.length > 0 && <PlaylistTrendy playlist={playlist[0]} />}
      <div className='test'>test!</div>
      <StyledSlider {...settings} afterChange={(idx) => setCurrentIndex(idx)}>
        {playlist &&
          playlist.map((pl) => (
            <div key={pl.id}>
              <Link to={`/playlist/${pl.id}`}>
                <PlaylistThumbnail playlist={pl} />
              </Link>
            </div>
          ))}
      </StyledSlider>
    </MainContent>
  );
};

export default Main;
