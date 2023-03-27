import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { useSelector } from 'react-redux';

import axios from 'axios';

import PlaylistThumbnail from '../components/mainPage/PlaylistThumbnail';
import PlaylistTrendy from '../components/mainPage/PlaylistTrendy/PlaylistTrendy';
import { MainContent, StyledSlider } from '../styles/main';

const Main = () => {
  const [playlist, setPlaylist] = useState([]);
  //eslint-disable-next-line no-unused-vars
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [displayCount, setDisplayCount] = useState(4);
  const [sliderData, setSliderData] = useState([]);

  // const user = useSelector((state) => state.user);

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
    if (displayCount >= sliderData.length) {
      setHasMore(false);
      return;
    }
    setDisplayCount((count) => count + 4);
  }, [sliderData, displayCount]);

  useEffect(() => {
    const getPlaylist = async () => {
      const response = await axios.get('http://localhost:3001/playlist');
      setPlaylist(response.data);
    };
    getPlaylist();
  }, []);

  useEffect(() => {
    const getSlider = async () => {
      const response = await axios.get('http://localhost:3001/slider');
      setSliderData(response.data);
    };
    getSlider();
  }, []);

  // useEffect(() => {
  //   const getPlaylist = async () => {
  //     const storedAccessToken = localStorage.getItem('accessToken');
  //     if (storedAccessToken) {
  //       try {
  //         const response = await axios.get(
  //           `http://15.165.199.44:8080/api/boards?page=1`,
  //           {
  //             headers: {
  //               Authorization: `${storedAccessToken}`,
  //               accept: 'application/json',
  //             },
  //           }
  //         );
  //         setPlaylist(response.data);
  //         console.log(response.data);
  //       } catch (e) {
  //         console.log(`get playlist error`);
  //       }
  //     }
  //   };
  //   getPlaylist();
  // }, []);

  const visiblePlaylist = sliderData.slice(0, displayCount);

  return (
    <InfiniteScroll
      dataLength={visiblePlaylist.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h6>Loading...</h6>}
      style={{ overflow: 'visible' }}>
      <MainContent>
        {playlist.length > 0 && <PlaylistTrendy playlist={playlist[1]} />}
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
                {el.sliderList &&
                  el.sliderList.map((idx) => {
                    const pl = playlist.find((p) => p.id === idx.id);
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
