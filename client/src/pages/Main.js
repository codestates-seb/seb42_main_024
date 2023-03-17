import PlaylistTrendy from '../components/mainPage/PlaylistTrendy';
import PlaylistThumbnail from '../components/mainPage/PlaylistThumbnail';
import { useState } from 'react';
import { MainContent, StyledSlider } from '../styles/main';

const Main = () => {
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

  const dummyData = [
    {
      playlistId: 1,
      playlistTitle: 'NewJeans',
      playlistImgSrc:
        'https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg?1d674a44faffa0ebd34d86c182463171/melon/resize/282/quality/80/optimize',
      playlistAuthor: 'main024',
      playlistTotalTime: '19:31',
      isLive: true,
    },
    {
      playlistId: 2,
      playlistTitle: 'IU',
      playlistImgSrc:
        'https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34',
      playlistAuthor: 'IU',
      playlistTotalTime: '45:67',
      isLive: true,
    },
    {
      playlistId: 3,
      playlistTitle: 'Anya Taylor Joy',
      playlistImgSrc: 'https://t1.daumcdn.net/cfile/tistory/2104E24758E8DEDF25',
      playlistAuthor: 'ATJ',
      playlistTotalTime: '12:34',
      isLive: true,
    },
    {
      playlistId: 4,
      playlistTitle: 'blank',
      playlistImgSrc: 'https://i.stack.imgur.com/mwFzF.png',
      playlistAuthor: 'blank',
      playlistTotalTime: '00:00',
      isLive: false,
    },

    {
      playlistId: 5,
      playlistTitle: 'blank',
      playlistImgSrc: 'https://i.stack.imgur.com/mwFzF.png',
      playlistAuthor: 'blank',
      playlistTotalTime: '00:00',
      isLive: false,
    },
    {
      playlistId: 6,
      playlistTitle: 'blank',
      playlistImgSrc: 'https://i.stack.imgur.com/mwFzF.png',
      playlistAuthor: 'blank',
      playlistTotalTime: '00:00',
      isLive: false,
    },
    {
      playlistId: 7,
      playlistTitle: 'blank',
      playlistImgSrc: 'https://i.stack.imgur.com/mwFzF.png',
      playlistAuthor: 'blank',
      playlistTotalTime: '00:00',
      isLive: true,
    },
    {
      playlistId: 8,
      playlistTitle: 'blank',
      playlistImgSrc: 'https://i.stack.imgur.com/mwFzF.png',
      playlistAuthor: 'blank',
      playlistTotalTime: '00:00',
      isLive: false,
    },
    {
      playlistId: 9,
      playlistTitle: 'blank',
      playlistImgSrc: 'https://i.stack.imgur.com/mwFzF.png',
      playlistAuthor: 'blank',
      playlistTotalTime: '00:00',
      isLive: false,
    },
    {
      playlistId: 10,
      playlistTitle: 'blank',
      playlistImgSrc: 'https://i.stack.imgur.com/mwFzF.png',
      playlistAuthor: 'blank',
      playlistTotalTime: '00:00',
      isLive: true,
    },
  ];

  return (
    <MainContent>
      <PlaylistTrendy />
      <div className='test'>test!</div>
      <StyledSlider {...settings} afterChange={(idx) => setCurrentIndex(idx)}>
        {dummyData.map((pl) => (
          <div key={pl.playlistId}>
            <PlaylistThumbnail playlist={pl} />
          </div>
        ))}
      </StyledSlider>
    </MainContent>
  );
};

export default Main;
