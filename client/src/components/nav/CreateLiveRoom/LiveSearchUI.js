import { useEffect, useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdClose, MdOutlineAddCircleOutline } from 'react-icons/md';

import axios from 'axios';

import {
  SearchUIContainer,
  SearchedSongsContainer,
  GetPlaylist,
} from '../../../styles/createroom';

const SearchUI = ({ playlistId, setPlaylistId, isOpenPlaylistCreator }) => {
  // 서치 바 ref
  const searchRef = useRef(null);
  // 서치 바 검색 클릭
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);
  // 서치 바 검색버튼 클릭
  const [isSearchedSongContainerOpen, setIsSearchedSongContainerOpen] =
    useState(false);
  // 유튜브 검색 결과
  const [searchData, setSearchData] = useState([]);
  // 빈 플리를 만드려고 할 때 나타나는 모달 창
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // <PlaylistCreator>이 닫힐 때 입력 값들 초기화
  useEffect(() => {
    if (isOpenPlaylistCreator === 'close') {
      setPlaylistId([]);
      setSearchData([]);
      setIsSearchedSongContainerOpen(false);
      setIsSearchBarClicked(false);
      searchRef.current.value = '';
    }
  }, [isOpenPlaylistCreator]);

  // 유튜브 API key
  const API = process.env.REACT_APP_YOUTUBE_API_KEY;

  // 유튜브 검색
  const handleSearching = () => {
    setIsSearchedSongContainerOpen(true);
    setIsSearchBarClicked(true);
    axios
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: API,
          part: 'snippet',
          q: searchRef.current.value,
          maxResults: 20,
          type: 'video',
          videoEmbeddable: true,
          videoLicense: 'youtube',
          // videoCategoryId: 10,
        },
      })
      .then((res) => setSearchData(res.data.items));
  };

  // HTML 특수문자 변환
  // ex) &#39; -> '
  const convertHTMLEscapeChar = (str) => {
    const tmpElem = document.createElement('textarea');
    tmpElem.innerHTML = str;
    const convertedStr = tmpElem.value;
    tmpElem.remove();
    return convertedStr;
  };

  // HTML 특수문자 변환된 title을 limit에 따라 슬라이스해줌
  const trimLongerTitle = (title, limit) => {
    const convertedTitle = convertHTMLEscapeChar(title);
    if (convertedTitle.length > limit)
      return convertedTitle.slice(0, limit).concat('...');
    return convertedTitle;
  };

  // <SearchedSongsContainer>에서 영상을 클릭하면 플레이리스트에 추가
  // videoId로 비교해 이미 있는 곡은 추가 불가
  const handleVideoClick = (song) => {
    const isAddable = playlistId.every(
      (s) => s.videoId.localeCompare(song.id.videoId) !== 0
    );
    if (isAddable) {
      const songData_toBeSavedInBackend = {
        videoId: song.id.videoId,
        thumbnail: song.snippet.thumbnails.high.url,
        title: convertHTMLEscapeChar(song.snippet.title),
      };
      setPlaylistId((prev) => prev.concat(songData_toBeSavedInBackend));
    } else {
      setIsAlertModalOpen(true);
      setTimeout(() => {
        setIsAlertModalOpen(false);
      }, 1000);
    }
  };

  // 추가된 노래를 playlistId에서 삭제
  // 전제: playlistId에는 같은 곡을 추가할 수 없다 <- handleVideoClick(song)에서 이미 있는 곡은 추가할 수 없음
  const handleDeleteAddedSong = (videoId) => {
    setPlaylistId(playlistId.filter((song) => song.videoId !== videoId));
  };

  return (
    <SearchUIContainer>
      {/* search bar */}
      <div className='searchBar'>
        <input
          type='text'
          className='search-youtube'
          ref={searchRef}
          placeholder='유튜브 검색'
        />
        <button className='searchBtn' onClick={handleSearching}>
          <FaSearch />
        </button>
      </div>
      <GetPlaylist>asdas</GetPlaylist>
      {/* 추가된 곡들 정보 */}
      <div className='addedSongsInfo'>{`총 ${playlistId.length}곡`}</div>
      {/* 추가된 곡들 리스트 */}
      <div className='addedSongs'>
        {/* 플레이리스트가 비어있지 않을 때, 해당 곡들을 보여줌 */}
        {playlistId.length !== 0 &&
          playlistId.map((song) => (
            <div key={song.videoId} className='addedSong'>
              <div className='songInfo'>
                <img
                  src={song.thumbnail}
                  alt='thumbnail'
                  className='thumbnail'
                />
                <div className='title'>{trimLongerTitle(song.title, 25)}</div>
              </div>
              <button
                onClick={() => handleDeleteAddedSong(song.videoId)}
                className='deleteBtn'>
                <MdClose />
              </button>
            </div>
          ))}
        {/* 플레이리스트가 비어있을 때 */}
        {playlistId.length === 0 && <p className='empty-playlist'>텅</p>}
      </div>
      {/* 유튜브 검색 결과 */}
      {isSearchedSongContainerOpen && isSearchBarClicked && (
        <SearchedSongsContainer>
          {searchData.map((song) => (
            <button
              key={song.id.videoId}
              className='searched-song'
              onClick={() => handleVideoClick(song)}>
              <img
                src={song.snippet.thumbnails.high.url}
                alt='video thumbnail'
                className='thumbnail'
              />
              <div className='title'>
                {convertHTMLEscapeChar(song.snippet.title)}
              </div>
              {/* 검색된 유튜브 영상의 호버링 */}
              <div className='hovering'>
                <MdOutlineAddCircleOutline className='addIcon' />
              </div>
            </button>
          ))}
        </SearchedSongsContainer>
      )}
      {/* 같은 곡 추가를 시도했을 때 알림 모달 */}
      {isAlertModalOpen && (
        <div className='alertModal'>이미 추가된 노래입니다</div>
      )}
    </SearchUIContainer>
  );
};

export default SearchUI;
