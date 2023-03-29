import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Liverooms from '../components/liveroom/Liverooms';
import { API } from '../config';
import {
  LiveroomListContainer,
  AllLiveroomList,
  PopularLiveroomList,
  PopularLiveroomListContainer,
  PopularLiveroomListTitle,
  PopularLiveroomListMain,
  AllLiveroomListContainer,
  AllLiveroomListTitle,
  AllLiveroomListMain,
} from '../styles/liveroomlist';

function LiveroomList() {
  const [popularSongs, setPopularSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const [infiniteId, setInfiniteId] = useState(0);
  const [loading, setLoading] = useState(false);

  const pageEnd = useRef();

  const morePages = async (page) => {
    const res = await axios.get(`${API.LIVEROOM}`, {
      headers: {
        Authorization: `${accessToken}`,
        accept: 'application/json',
      },
      params: {
        id: page,
      },
    });
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(res.data.data.chatroomList.splice(0, 3));
    }
    if (page === 0) {
      setInfiniteId(res.data.data.next);
    }
    if (page >= 0) {
      setAllSongs((prev) => [...prev, ...arr]);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (infiniteId >= 0) {
      morePages(infiniteId);
    }
  }, [infiniteId]);

  const loadMore = () => {
    setInfiniteId((prev) => prev - 9);
  };

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  useEffect(() => {
    axios
      .get(`${API.LIVEROOM}/rank`, {
        headers: {
          Authorization: `${accessToken}`,
          accept: 'application/json',
        },
      })
      .then((e) => {
        setPopularSongs(e.data.data);
      });
  }, []);

  return (
    <>
      <LiveroomListContainer>
        <PopularLiveroomList>
          <PopularLiveroomListContainer>
            <PopularLiveroomListTitle>인기있는 방송</PopularLiveroomListTitle>
            <PopularLiveroomListMain>
              <Swiper
                className='swiper'
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 1000 }}>
                {popularSongs?.map((e) => {
                  return (
                    <SwiperSlide key={e.chatroomId}>
                      <Liverooms song={e} type='PO'></Liverooms>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </PopularLiveroomListMain>
          </PopularLiveroomListContainer>
        </PopularLiveroomList>
        <AllLiveroomList>
          <AllLiveroomListContainer>
            <AllLiveroomListTitle>전체</AllLiveroomListTitle>
            {allSongs?.map((fourSongdata, index) => {
              return (
                <AllLiveroomListMain key={index}>
                  <Swiper
                    className='swiper'
                    modules={[Navigation]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    scrollbar={{ draggable: true }}>
                    {fourSongdata?.map((e) => {
                      return (
                        <SwiperSlide key={e.chatroomId}>
                          {' '}
                          <Liverooms song={e} type='ALL'></Liverooms>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </AllLiveroomListMain>
              );
            })}
          </AllLiveroomListContainer>
        </AllLiveroomList>
        <div ref={pageEnd} style={{ width: '100%', height: 50 }}></div>
      </LiveroomListContainer>
    </>
  );
}

export default LiveroomList;
