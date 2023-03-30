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

  // slider Title 설정
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
  // react-slick 설정
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

  // InfiniteScroll 사용을 위해 데이터를 가져오는 함수
  const fetchMoreData = useCallback(() => {
    if (displayCount >= sliderTitle.length) {
      setHasMore(false);
      return;
    }
    setDisplayCount((count) => count + 3);
  }, [displayCount, sliderTitle.length]);

  // PlaylistTrendy에 들어갈 데이터를 랜덤으로 가져옴
  useEffect(() => {
    const getTrendy = async () => {
      try {
        const getRandomBoard = Math.floor(Math.random() * 20);
        const response = await axios.get(`${API.BOARD}/${getRandomBoard}`);
        setTrendyBoard(response.data.data.board);
        setTrendyList(response.data.data.playlist);
      } catch (e) {
        console.error(e);
      }
    };
    getTrendy();
  }, []);

  // Slider에 들어갈 데이터를 가져옴
  useEffect(() => {
    const getPlaylist = async () => {
      if (pageNum > 5) {
        return;
      }
      try {
        const response = await axios.get(`${API.BOARD}?page=${pageNum}`);
        const newData = {};
        // newData에 playlistId를 키로 사용하고 값을 할당
        response.data.data.forEach((item) => {
          newData[item.playlistId] = item;
        });
        // 이전 상태의 playlist와 newData를 합쳐 상태 업데이트
        setPlaylist((prev) => ({ ...prev, ...newData }));
        setPageNum((count) => count + 1);
      } catch (e) {
        console.error(e);
      }
    };
    getPlaylist();
  }, [pageNum]);

  // InfiniteScroll 동작 시 보여질 Slider 갯수
  const visiblePlaylist = sliderTitle.slice(0, displayCount);
  // 인기 리스트에 출력할 Playlist
  const firstSlider = Object.values(playlist)
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 6);
  // 인기 리스트에 사용한 데이터를 제외하고 나머지 리스트에 랜덤으로 출력
  const otherSlider = Object.values(playlist).filter(
    (item) =>
      !firstSlider.some((fsItem) => fsItem.playlistId === item.playlistId)
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
