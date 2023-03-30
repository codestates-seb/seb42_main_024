import { useRef, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { MdClose, MdOutlineAddCircleOutline } from 'react-icons/md';

import axios from 'axios';

import axiosCall from '../../axios/axiosCall';
import { API } from '../../config';
import {
  LiveroomSetterContianer,
  SearchedSongsContainer,
} from '../../styles/liveroomsetter';

const LiveroomSetter = ({
  chatroomId,
  setIsSettingModalOpen,
  setChangeSong,
  nextSongHandler,
  isEnd,
}) => {
  const [newSong, setNewSong] = useState(null);
  const searchRef = useRef(null);
  const [searchData, setSearchData] = useState([]);

  // 서치 바 검색 클릭
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);
  // 서치 바 검색버튼 클릭
  const [isSearchedSongContainerOpen, setIsSearchedSongContainerOpen] =
    useState(false);

  const addNewSong = () => {
    if (newSong !== null) {
      // axios send newSong
      axiosCall(`${API.LIVEROOM}/${chatroomId}/songs`, 'post', newSong).then(
        () => {
          setChangeSong((prev) => !prev);
          if (isEnd) {
            nextSongHandler(false);
          }
        }
      );
      // 초기화
      searchRef.current.value = '';
      setNewSong(null);
      setIsSettingModalOpen(false);
    } else {
      // 추가한 곡이 없을 때
      alert('추가할 곡이 없습니다');
    }
  };

  // 유튜브 API key
  const YOUTUBE_API = process.env.REACT_APP_YOUTUBE_API_KEY;

  // 유튜브 검색
  const handleSearching = () => {
    setIsSearchedSongContainerOpen(true);
    setIsSearchBarClicked(true);
    axios
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: YOUTUBE_API,
          part: 'snippet',
          q: searchRef.current.value,
          maxResults: 12,
          type: 'video',
          videoEmbeddable: true,
          videoLicense: 'youtube',
        },
      })
      .then((res) => setSearchData(res.data.items));
  };

  // enter키로 유튜브 검색
  const handleEnterKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearching();
    }
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

  // <SearchedSongsContainer>에서 영상을 클릭하면 플레이리스트에 추가
  // videoId로 비교해 이미 있는 곡은 추가 불가
  const handleVideoClick = (song) => {
    const songData_toBeSavedInBackend = {
      videoId: song.id.videoId,
      thumbnail: song.snippet.thumbnails.high.url,
      title: convertHTMLEscapeChar(song.snippet.title),
    };
    setNewSong(songData_toBeSavedInBackend);
  };

  const deleteSong = () => {
    setNewSong(null);
  };

  return (
    <LiveroomSetterContianer>
      {/* 줄1 */}
      <div className='header'>
        <div className='modalTitle'>
          <BsFillGearFill />
          <div className='modalTitle'>라이브룸 설정</div>
        </div>
        <div className='modalBtns'>
          <button className='add' onClick={addNewSong}>
            추가하기
          </button>
          <button
            className='close'
            onClick={() => setIsSettingModalOpen(false)}>
            <MdClose />
          </button>
        </div>
      </div>
      {/* 줄2: 추가한 노래 */}
      {newSong === null && <div className='newSong'>텅...</div>}
      {newSong !== null && (
        <div className='newSong'>
          <img
            src={newSong.thumbnail}
            alt='thumbnail'
            className='newSongThumbnail'
          />
          <div className='newSongTitle'>{newSong.title}</div>
          <div className='deletBtnWrapper'>
            <button onClick={deleteSong} className='deleteNewSong'>
              <MdClose />
            </button>
          </div>
        </div>
      )}
      {/* 줄3: 유튜브 검색 */}
      {/* search bar */}
      <div className='searchBar'>
        <input
          type='text'
          className='search-youtube'
          ref={searchRef}
          placeholder='유튜브 검색'
          onKeyDown={handleEnterKeyDown}
        />
        <button className='searchBtn' onClick={handleSearching}>
          <FaSearch />
        </button>
      </div>
      {/* 줄4: 유튜브 검색 결과 */}
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
    </LiveroomSetterContianer>
  );
};

export default LiveroomSetter;
