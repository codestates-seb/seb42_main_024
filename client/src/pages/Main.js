import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import axios from 'axios';

import PlaylistThumbnail from '../components/mainPage/PlaylistThumbnail';
import PlaylistTrendy from '../components/mainPage/PlaylistTrendy/PlaylistTrendy';
import { MainContent, StyledSlider } from '../styles/main';

const sliderContents = [
  {
    sliderId: 1,
    sliderTitle: '지금 가장 인기 있는 리스트',
    sliderList: [0, 1, 2, 3, 4, 5],
  },
  {
    sliderId: 2,
    sliderTitle: '오늘의 추천 플레이리스트',
    sliderList: [1, 2, 3, 4, 5, 6],
  },
  {
    sliderId: 3,
    sliderTitle: '오늘 날씨에 딱 어울려요',
    sliderList: [2, 3, 4, 5, 6, 7],
  },
  {
    sliderId: 4,
    sliderTitle: '드라이브 필수 준비물',
    sliderList: [3, 4, 5, 6, 7, 8],
  },
  {
    sliderId: 5,
    sliderTitle: '노동에는 노동요',
    sliderList: [4, 5, 6, 7, 8, 9],
  },
  {
    sliderId: 6,
    sliderTitle: '지금 가장 인기 있는 리스트',
    sliderList: [0, 1, 2, 3, 4, 5],
  },
  {
    sliderId: 7,
    sliderTitle: '오늘의 추천 플레이리스트',
    sliderList: [1, 2, 3, 4, 5, 6],
  },
  {
    sliderId: 8,
    sliderTitle: '오늘 날씨에 딱 어울려요',
    sliderList: [2, 3, 4, 5, 6, 7],
  },
  {
    sliderId: 9,
    sliderTitle: '드라이브 필수 준비물',
    sliderList: [3, 4, 5, 6, 7, 8],
  },
  {
    sliderId: 10,
    sliderTitle: '노동에는 노동요',
    sliderList: [4, 5, 6, 7, 8, 9],
  },
  {
    sliderId: 11,
    sliderTitle: '지금 가장 인기 있는 리스트',
    sliderList: [0, 1, 2, 3, 4, 5],
  },
  {
    sliderId: 12,
    sliderTitle: '오늘의 추천 플레이리스트',
    sliderList: [1, 2, 3, 4, 5, 6],
  },
  {
    sliderId: 13,
    sliderTitle: '오늘 날씨에 딱 어울려요',
    sliderList: [2, 3, 4, 5, 6, 7],
  },
  {
    sliderId: 14,
    sliderTitle: '드라이브 필수 준비물',
    sliderList: [3, 4, 5, 6, 7, 8],
  },
  {
    sliderId: 15,
    sliderTitle: '노동에는 노동요',
    sliderList: [4, 5, 6, 7, 8, 9],
  },
  {
    sliderId: 16,
    sliderTitle: '지금 가장 인기 있는 리스트',
    sliderList: [0, 1, 2, 3, 4, 5],
  },
  {
    sliderId: 17,
    sliderTitle: '오늘의 추천 플레이리스트',
    sliderList: [1, 2, 3, 4, 5, 6],
  },
  {
    sliderId: 18,
    sliderTitle: '오늘 날씨에 딱 어울려요',
    sliderList: [2, 3, 4, 5, 6, 7],
  },
  {
    sliderId: 19,
    sliderTitle: '드라이브 필수 준비물',
    sliderList: [3, 4, 5, 6, 7, 8],
  },
  {
    sliderId: 20,
    sliderTitle: '노동에는 노동요',
    sliderList: [4, 5, 6, 7, 8, 9],
  },
  {
    sliderId: 21,
    sliderTitle: '지금 가장 인기 있는 리스트',
    sliderList: [0, 1, 2, 3, 4, 5],
  },
  {
    sliderId: 22,
    sliderTitle: '오늘의 추천 플레이리스트',
    sliderList: [1, 2, 3, 4, 5, 6],
  },
  {
    sliderId: 23,
    sliderTitle: '오늘 날씨에 딱 어울려요',
    sliderList: [2, 3, 4, 5, 6, 7],
  },
  {
    sliderId: 24,
    sliderTitle: '드라이브 필수 준비물',
    sliderList: [3, 4, 5, 6, 7, 8],
  },
  {
    sliderId: 25,
    sliderTitle: '노동에는 노동요',
    sliderList: [4, 5, 6, 7, 8, 9],
  },
  {
    sliderId: 26,
    sliderTitle: '지금 가장 인기 있는 리스트',
    sliderList: [0, 1, 2, 3, 4, 5],
  },
  {
    sliderId: 27,
    sliderTitle: '오늘의 추천 플레이리스트',
    sliderList: [1, 2, 3, 4, 5, 6],
  },
  {
    sliderId: 28,
    sliderTitle: '오늘 날씨에 딱 어울려요',
    sliderList: [2, 3, 4, 5, 6, 7],
  },
  {
    sliderId: 29,
    sliderTitle: '드라이브 필수 준비물',
    sliderList: [3, 4, 5, 6, 7, 8],
  },
  {
    sliderId: 30,
    sliderTitle: '노동에는 노동요',
    sliderList: [4, 5, 6, 7, 8, 9],
  },
];

const Main = () => {
  const [playlist, setPlaylist] = useState([]);
  //eslint-disable-next-line no-unused-vars
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [displayCount, setDisplayCount] = useState(4);

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

  const fetchMoreData = useCallback(() => {
    if (displayCount >= sliderContents.length) {
      setHasMore(false);
      return;
    }
    setDisplayCount((count) => count + 4);
  }, [sliderContents, displayCount]);

  useEffect(() => {
    const getPlaylist = async () => {
      const response = await axios.get('http://localhost:3001/playlist');
      setPlaylist(response.data);
    };
    getPlaylist();
  }, []);

  const visiblePlaylist = sliderContents.slice(0, displayCount);

  return (
    <InfiniteScroll
      dataLength={visiblePlaylist.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h6>Loading...</h6>}
      style={{ overflow: 'visible' }}>
      <MainContent>
        {playlist.length > 0 && <PlaylistTrendy playlist={playlist[0]} />}
        {visiblePlaylist.length > 0 &&
          visiblePlaylist.map((el) => (
            <React.Fragment key={`section-${el.sliderId}`}>
              <div className='playlist-name' key={`title-${el.sliderId}`}>
                {el.sliderTitle}
              </div>
              <StyledSlider
                key={`slider-${el.sliderId}`}
                {...settings}
                afterChange={(idx) => setCurrentIndex(idx)}>
                {playlist &&
                  el.sliderList.map((idx) => {
                    const pl = playlist[idx];
                    if (pl) {
                      return (
                        <div key={pl.id}>
                          <PlaylistThumbnail playlist={pl} />
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
              </StyledSlider>
            </React.Fragment>
          ))}
      </MainContent>
    </InfiniteScroll>
  );
};

export default Main;
