import { useEffect, useRef, useState } from 'react';

// import axios from 'axios';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Liverooms from '../components/liveroom/Liverooms';
import Nav from '../components/nav/Nav';
import NowPlaying from '../components/player/NowPlaying';
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
  const dummyData = [
    {
      key: 1,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 2,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 3,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 4,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 5,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 6,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 7,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 8,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 9,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 10,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 11,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 12,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 13,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 14,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 15,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 16,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 17,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 18,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
    {
      key: 19,
      singer: '누진세',
      musicTitle: '하입보잉',
      thumnailURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
      userCount: 10,
    },
  ];
  const [popularSongs, setPopularSongs] = useState();
  const [allSongs, setAllSongs] = useState([]);
  const [aarr, setAarr] = useState(dummyData);

  const target = useRef(null);

  const options = {
    threshold: 0.9,
  };

  const callback = () => {
    setAllSongs((prev) => {
      const newArr = aarr.slice(0, 3);
      return [...prev, newArr];
    });
  };

  const observer = new IntersectionObserver(callback, options);
  useEffect(() => {
    observer.observe(target.current);
  }, []);

  useEffect(() => {
    // axios.get('').then((e) => {
    //     받아온 데이터 처리
    // });
    const Parr = [...dummyData].slice(0, 6);
    setPopularSongs(Parr);
  }, []);

  useEffect(() => {
    if (aarr.length !== 0) {
      setAllSongs((prev) => {
        const newArr = aarr.slice(0, 3);
        setAarr((prev) => prev.slice(3, -1));
        return [...prev, newArr, newArr, newArr];
      });
    }
  }, []);

  return (
    <>
      <Nav></Nav>
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
                    <SwiperSlide key={e.key}>
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
                        <SwiperSlide key={e.key}>
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
        <div ref={target} style={{ width: '100%', height: 30 }}>
          안녕
        </div>
      </LiveroomListContainer>
      <NowPlaying></NowPlaying>
    </>
  );
}

export default LiveroomList;
