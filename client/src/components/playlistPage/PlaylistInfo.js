import { useState, useRef, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoMdAddCircleOutline, IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { setPlaylist, togglePlay } from '../../actions/actions';
import {
  PlaylistInfoContainer,
  PlaylistInfoMain,
  PlaylistInfoModal,
} from '../../styles/playlist';
import SearchUI from '../nav/playlistCreator/SearchUI';

PlaylistInfoModal.setAppElement('#root');

const PlaylistInfo = ({ boardId, isEditing, setIsEditing }) => {
  const memberId = useSelector((state) => state.user.memberId);

  const dispatch = useDispatch();

  const handlePlayBtnClick = () => {
    dispatch(setPlaylist(playlistData.songList));
    dispatch(togglePlay());
  };
  // ref
  const boardTitleRef = useRef(null);
  const boardDescRef = useRef(null);
  // 플리 설명 더보기 모달
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const toggleIsInfoModalOpen = () => setIsInfoModalOpen((prev) => !prev);
  // 곡 추가 모달
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
  // 곡 추가 리스트
  const [newSongList, setNewSongList] = useState([]);
  // 삭제 버튼
  const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);

  const [boardData, setBoardData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://15.165.199.44:8080/api/boards/${boardId}`).then((res) => {
      setBoardData(res.data.data.board);
      setPlaylistData(res.data.data.playlist);
      console.log(
        'playlistinfo - useeffect - playlistData: ',
        res.data.data.playlist
      );
    });
  }, []);

  // 삭제 버튼
  const handleDelete = () => {
    const storedAccessToken = localStorage.getItem('accessToken');
    axios
      .delete(`http://15.165.199.44:8080/api/boards/${boardId}`, {
        headers: {
          Authorization: `${storedAccessToken}`,
          accept: 'application/json',
        },
      })
      .then(console.log)
      .catch(console.log);
    setDeleteBtnClicked(false);
    // TODO: navigate -> mainPage or myPage
    navigate('/');
  };

  // 완료 버튼
  const handleCompleteEditting = () => {
    // PATCH /boards
    const requestBody = {
      boardTitle: boardTitleRef.current.value,
      boardContent: boardDescRef.current.value,
      boardThumb: playlistData.songList[0].thumbnail,
    };
    const storedAccessToken = localStorage.getItem('accessToken');

    axios
      .all([
        axios.patch(
          `http://15.165.199.44:8080/api/boards/${boardId}/${memberId}`,
          requestBody,
          {
            headers: {
              Authorization: `${storedAccessToken}`,
              accept: 'application/json',
            },
          }
        ),
        axios.patch(
          `http://15.165.199.44:8080/api/playlists/${playlistData.playlistId}`,
          playlistData,
          {
            headers: {
              Authorization: `${storedAccessToken}`,
              accept: 'application/json',
            },
          }
        ),
      ])
      .then(
        axios.spread((res1, res2) => {
          console.log('PATCH /boards: ', res1);
          console.log('PATCH /playlists: ', res2);
        })
      );
    // 수정 버튼 !isClicked
    setIsEditing(false);
    navigate(`/playlists/${boardId}`);
  };

  // 곡 추가 창 닫기
  const handleCloseAddSongModal = () => {
    setNewSongList([]);
    setIsAddSongModalOpen(false);
  };
  // 곡 추가
  // 기존 리스트에 중복되는 곡은 추가하지 않음
  const handleAddBtn = () => {
    const songList = playlistData.songList;
    const filteredNewSongList = newSongList.filter((newSong) =>
      songList.every((song) => song.videoId !== newSong.videoId)
    );
    songList.push(...filteredNewSongList);
    setPlaylistData({
      ...playlistData,
      songCount: songList.length,
      songList,
    });
    handleCloseAddSongModal();
  };

  return (
    <PlaylistInfoContainer>
      <img src={boardData?.boardThumb} alt='playlist thumbnail' />
      <div className='info'>
        <PlaylistInfoMain>
          {/* 플리 제목 */}
          {!isEditing && <div className='title'>{boardData?.boardTitle}</div>}
          {isEditing && (
            <input
              type='text'
              ref={boardTitleRef}
              className='title'
              defaultValue={boardData?.boardTitle}
            />
          )}
          {/* 플리 설명 */}
          {!isEditing && <div className='desc'>{boardData?.boardContent}</div>}
          {isEditing && (
            <textarea
              className='desc'
              ref={boardDescRef}
              defaultValue={boardData?.boardContent}
            />
          )}
          {/* 플리 설명 더보기 버튼 */}
          {!isEditing && (
            <button onClick={toggleIsInfoModalOpen} className='moreInfo'>
              더보기
            </button>
          )}
          {isEditing && <div className='emptySpace'></div>}
          {/* 플리 설명 더보기 모달 */}
          <PlaylistInfoModal
            isOpen={isInfoModalOpen}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            onRequestClose={toggleIsInfoModalOpen}>
            <IoMdClose onClick={toggleIsInfoModalOpen} className='closeIcon' />
            <div className='title'>{boardData?.boardTitle}</div>
            <div className='desc'>{boardData?.boardContent}</div>
          </PlaylistInfoModal>
          {/* 버튼 */}
          <div className='infoBtns'>
            <button className='btn1' onClick={handlePlayBtnClick}>
              <FaPlay />
              <div>재생</div>
            </button>
            {boardData?.memberId === memberId && (
              <button
                className={isEditing ? 'clicked' : 'btn1'}
                onClick={() => setIsEditing((prev) => !prev)}>
                {isEditing ? <div>취소</div> : <div>수정</div>}
              </button>
            )}
            {boardData?.memberId === memberId && isEditing && (
              <button onClick={() => setDeleteBtnClicked(true)}>
                <div>삭제</div>
              </button>
            )}
            {isEditing && (
              <button
                className='btn2'
                onClick={() => setIsAddSongModalOpen(true)}>
                <IoMdAddCircleOutline />
                <div>추가</div>
              </button>
            )}
            {/* 곡 추가 모달 */}
            <PlaylistInfoModal isOpen={isAddSongModalOpen}>
              <IoMdClose
                onClick={handleCloseAddSongModal}
                className='closeIcon'
              />
              {/* // TODO: CSS */}
              <button className='addBtn' onClick={handleAddBtn}>
                추가하기
              </button>
              <div className='title'></div>
              <div className='desc'></div>
              <div>searchUI</div>
              <SearchUI
                songList={newSongList}
                setSongList={setNewSongList}
                isOpenPlaylistCreator={isAddSongModalOpen}
              />
            </PlaylistInfoModal>
            {isEditing && (
              <button className='' onClick={handleCompleteEditting}>
                <div>완료</div>
              </button>
            )}
          </div>
          {deleteBtnClicked && (
            <div className='deleteModal'>
              <div className='msg'>{`<${boardData?.boardTitle}> 플레이리스트를 삭제하시겠습니까?`}</div>
              <div className='deleteBtns'>
                <button className='delete' onClick={handleDelete}>
                  삭제
                </button>
                <button
                  className='cancel'
                  onClick={() => setDeleteBtnClicked(false)}>
                  취소
                </button>
              </div>
            </div>
          )}
        </PlaylistInfoMain>
      </div>
    </PlaylistInfoContainer>
  );
};

export default PlaylistInfo;
