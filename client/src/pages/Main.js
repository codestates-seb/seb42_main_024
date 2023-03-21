import React, { useEffect, useState } from 'react';

import axios from 'axios';

import PlaylistThumbnail from '../components/mainPage/PlaylistThumbnail';
import PlaylistTrendy from '../components/mainPage/PlaylistTrendy/PlaylistTrendy';
import { MainContent, StyledSlider } from '../styles/main';

const sliderNames = [
  '지금 가장 인기 있는 리스트',
  '오늘의 추천 플레이리스트',
  '오늘 날씨에 딱 어울려요',
  '드라이브 필수 준비물',
  '노동에는 노동요',
  'test',
  'testtest',
  'testtesttest',
  'testtesttesttest',
  'testtesttest1',
  'testtest2',
  'test3',
  'testtest',
  'testtesttesttest',
];

const Main = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); //eslint-disable-line no-unused-vars
  const [randomPlaylist, setRandomPlaylist] = useState([]);

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

  const getRandomPlaylist = (pl, count) => {
    if (pl.length < count) {
      count = pl.length;
    }
    const shuffled = pl.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const getPlaylist = async () => {
      const playlist = await axios.get('http://localhost:3001/playlist');
      setPlaylist(playlist.data);

      const randomPl = () => {
        return Array.from({ length: 14 }, () =>
          getRandomPlaylist(playlist.data, 6)
        );
      };
      setRandomPlaylist(randomPl());
    };
    getPlaylist();
  }, []);

  return (
    <MainContent>
      {playlist.length > 0 && <PlaylistTrendy playlist={playlist[0]} />}
      {Array.from({ length: 14 }, (_, index) => (
        <React.Fragment key={index}>
          <div className='playlist-name'>{sliderNames[index]}</div>
          <StyledSlider
            {...settings}
            afterChange={(idx) => setCurrentIndex(idx)}>
            {randomPlaylist[index] &&
              randomPlaylist[index].map((pl) => (
                <div key={pl.id}>
                  <PlaylistThumbnail playlist={pl} />
                </div>
              ))}
          </StyledSlider>
        </React.Fragment>
      ))}
    </MainContent>
  );
};

export default Main;
