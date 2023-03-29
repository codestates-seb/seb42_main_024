import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import axios from 'axios';

import PlaylistThumbnail from '../components/mainPage/PlaylistThumbnail';
import PlaylistTrendy from '../components/mainPage/PlaylistTrendy/PlaylistTrendy';
import { API } from '../config';
import { MainContent, StyledSlider } from '../styles/main';

const getSliderData = (idx, data, item) => {
  const startIdx = (idx * item) % data.length;
  const endIdx = startIdx + item;
  const result = [...data.slice(startIdx, endIdx)];

  if (endIdx > data.length) {
    result.push(...data.slice(0, endIdx - data.length));
  }
  return result;
};

const Main = () => {
  const [playlist, setPlaylist] = useState({});
  //eslint-disable-next-line no-unused-vars
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [displayCount, setDisplayCount] = useState(3);
  const [trendyBoard, setTrendyBoard] = useState(null);
  const [trendyList, setTrendyList] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const sliderTitle = [
    '지금 가장 인기 있는 리스트',
    '오늘의 추천 플레이리스트',
    '오늘 날씨에 딱 어울려요',
    '드라이브 필수 준비물',
    '노동에는 노동요',
    '봄이 왔으면 이 노래를 들어야지',
    '요즘 애들은 뭘 듣고 사나요',
    'K-IDOL의 위엄',
    '이 노래 모르면 바보',
    '집중할 때 듣기 좋은 노래',
  ];

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
    if (displayCount >= sliderTitle.length) {
      setHasMore(false);
      return;
    }
    setDisplayCount((count) => count + 3);
  }, [displayCount, sliderTitle.length]);

  useEffect(() => {
    const getTrendy = async () => {
      try {
        const response = await axios.get(`${API.BOARD}/4`);
        setTrendyBoard(response.data.data.board);
        setTrendyList(response.data.data.playlist);
      } catch (e) {
        console.error(e);
      }
    };
    getTrendy();
  }, []);

  useEffect(() => {
    const getPlaylist = async () => {
      if (pageNum > 5) {
        return;
      }
      try {
        const response = await axios.get(`${API.BOARD}?page=${pageNum}`);
        const newData = {};
        response.data.data.forEach((item) => {
          newData[item.playlistId] = item;
        });
        setPlaylist((prev) => ({ ...prev, ...newData }));
        setPageNum((count) => count + 1);
      } catch (e) {
        console.error(e);
      }
    };
    getPlaylist();
  }, [pageNum]);

  const visiblePlaylist = sliderTitle.slice(0, displayCount);
  const sortedPlaylist = Object.values(playlist).sort(
    (a, b) => b.viewCount - a.viewCount
  );
  const firstSlider = sortedPlaylist.slice(0, 6);
  const otherSlider = sortedPlaylist.filter(
    (item) =>
      !firstSlider.find((fsItem) => fsItem.playlistId === item.playlistId)
  );

  return (
    <InfiniteScroll
      dataLength={visiblePlaylist.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h6>Loading...</h6>}
      style={{ overflow: 'visible' }}>
      <MainContent>
        {trendyBoard && trendyList && (
          <PlaylistTrendy trendyBoard={trendyBoard} trendyList={trendyList} />
        )}
        {visiblePlaylist.map((title, idx) => {
          const sliderData =
            idx === 0 ? firstSlider : getSliderData(idx - 1, otherSlider, 6);
          return (
            <React.Fragment key={`section-${idx}`}>
              <div className='playlist-name'>{title}</div>
              <StyledSlider
                key={`slider-${idx}`}
                {...settings}
                afterChange={(idx) => setCurrentIndex(idx)}>
                {sliderData.map((pl) => (
                  <div key={pl.playlistId}>
                    <PlaylistThumbnail playlist={pl} />
                  </div>
                ))}
              </StyledSlider>
            </React.Fragment>
          );
        })}
      </MainContent>
    </InfiniteScroll>
  );
};

export default Main;
