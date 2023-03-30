import { useState, useRef, useEffect } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { IoMdAddCircleOutline, IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { setPlaylist, togglePlay } from '../../actions/actions';
import { API } from '../../config';
import {
  PlaylistInfoContainer,
  PlaylistInfoMain,
  PlaylistInfoModal,
} from '../../styles/playlist';
import SearchUI from '../nav/playlistCreator/SearchUI';

PlaylistInfoModal.setAppElement('#root');

const PlaylistInfo = ({
  boardId,
  isEditing,
  setIsEditing,
  boardData,
  setBoardData,
  playlistData,
  setPlaylistData,
}) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handlePlayBtnClick = () => {
    dispatch(setPlaylist(playlistData.songList));
    dispatch(togglePlay());
  };
  // ref
  const boardTitleRef = useRef(null);
  const boardDescRef = useRef(null);
  // 곡 추가 모달
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
  // 곡 추가 리스트
  const [newSongList, setNewSongList] = useState([]);
  // 삭제 버튼
  const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);

  const navigate = useNavigate();
  // 삭제 버튼
  const handleDelete = () => {
    if (user) {
      const storedAccessToken = localStorage.getItem('accessToken');
      axios
        .delete(`${API.BOARD}/${boardId}/${user.memberId}`, {
          headers: {
            Authorization: `${storedAccessToken}`,
            accept: 'application/json',
          },
        })
        .then(() => {
          setDeleteBtnClicked(false);
          navigate('/');
        });
    }
  };

  // 완료 버튼
  const handleCompleteEditting = () => {
    if (user) {
      // PATCH /boards
      const requestBody = {
        boardTitle: boardTitleRef.current.value,
        boardContent: boardDescRef.current.value,
        boardThumb: playlistData.songList[0].thumbnail,
      };
      const storedAccessToken = localStorage.getItem('accessToken');

      // eslint-disable-next-line
      axios.all([
        axios.patch(`${API.BOARD}/${boardId}/${user.memberId}`, requestBody, {
          headers: {
            Authorization: `${storedAccessToken}`,
            accept: 'application/json',
          },
        }),
        axios.patch(
          `${API.PLAYLIST}/${playlistData.playlistId}`,
          playlistData,
          {
            headers: {
              Authorization: `${storedAccessToken}`,
              accept: 'application/json',
            },
          }
        ),
      ]);
      // 수정 버튼 !isClicked
      setIsEditing(false);
      setDeleteBtnClicked(false);
      setBoardData({ ...boardData, ...requestBody });
      navigate(`/playlist/${boardId}`);
    }
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

  const handleEditBtnClick = () => {
    setIsEditing(true);
  };

  const handleCancelBtnClick = () => {
    setDeleteBtnClicked(false);
    setIsEditing(false);
  };

  const [isHearted, setIsHearted] = useState(null);

  // 좋아요를 누른 플리인가? : isHearted
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    axios
      .get(`${API.LIKE}/status/${boardId}`, {
        headers: {
          Authorization: `${storedAccessToken}`,
          accept: 'application/json',
        },
      })
      .then((res) => setIsHearted(res.data.data.hasLiked));
  }, []);

  return (
    <PlaylistInfoContainer>
      <img
        src={boardData?.boardThumb}
        alt='playlist thumbnail'
        className='boardThumbnail'
      />
      <div className='info'>
        <PlaylistInfoMain>
          {/* 플리 제목 */}
          <div className='header'>
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
            {!isEditing && (
              <div className='desc'>{boardData?.boardContent}</div>
            )}
            {isEditing && (
              <textarea
                className='desc'
                ref={boardDescRef}
                defaultValue={boardData?.boardContent}
              />
            )}
          </div>
          {/* 버튼 */}
          <div className='footer'>
            <VoteInfo
              isHearted={isHearted}
              setIsHearted={setIsHearted}
              boardData={boardData}
              boardId={boardId}
            />
            <div className='infoBtns'>
              <button className='btn1' onClick={handlePlayBtnClick}>
                <FaPlay />
                <div>재생</div>
              </button>
              {boardData?.memberId === user?.memberId && isEditing && (
                <button className='clicked' onClick={handleCancelBtnClick}>
                  <div>취소</div>
                </button>
              )}
              {boardData?.memberId === user?.memberId && !isEditing && (
                <button className='btn1' onClick={handleEditBtnClick}>
                  <div>수정</div>
                </button>
              )}
              {boardData?.memberId === user?.memberId && isEditing && (
                <button
                  onClick={() => setDeleteBtnClicked(true)}
                  className='deleteBtn'>
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
                {/* // TODO: CSS */}
                <div className='header'>
                  <div className='title'>노래 추가</div>
                  <div className='btns'>
                    <button className='addBtn' onClick={handleAddBtn}>
                      추가하기
                    </button>
                    <IoMdClose
                      onClick={handleCloseAddSongModal}
                      className='closeIcon'
                    />
                  </div>
                </div>
                <SearchUI
                  songList={newSongList}
                  setSongList={setNewSongList}
                  isOpenPlaylistCreator={isAddSongModalOpen}
                />
              </PlaylistInfoModal>
              {isEditing && (
                <button onClick={handleCompleteEditting} className='btn1'>
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
          </div>
        </PlaylistInfoMain>
      </div>
    </PlaylistInfoContainer>
  );
};

const VoteInfo = ({ isHearted, setIsHearted, boardData, boardId }) => {
  const [likeCnt, setLikeCnt] = useState(0);

  useEffect(() => {
    setLikeCnt(boardData?.likeCount);
  }, []);

  // 플리 좋아요 클릭
  const handleVote = () => {
    const storedAccessToken = localStorage.getItem('accessToken');
    axios
      .post(
        `${API.LIKE}/up/${boardId}`,
        {},
        {
          headers: {
            Authorization: `${storedAccessToken}`,
            accept: 'application/json',
          },
        }
      )
      .then(() => {
        if (isHearted) setLikeCnt(likeCnt - 1);
        else setLikeCnt(likeCnt + 1);
        setIsHearted((prev) => !prev);
      });
  };
  return (
    <div className='voteInfo'>
      <div className='likeContainer'>
        <div className='btnWrapper'>
          <button
            className={isHearted === true ? 'heart voted' : 'heart'}
            onClick={handleVote}>
            {isHearted === true ? <BsHeartFill /> : <BsHeart />}
          </button>
        </div>
        {likeCnt >= 0 && <div className='likeCnt'> {likeCnt}</div>}
      </div>
      <div className='viewContainer'>
        <div className='views'>조회수</div>
        <div className='viewCnt'>{boardData?.viewCount}</div>
      </div>
    </div>
  );
};

export default PlaylistInfo;
