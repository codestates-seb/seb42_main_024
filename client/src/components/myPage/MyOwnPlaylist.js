import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { API } from '../../config';
import { MyOwnPlaylistContainer } from '../../styles/myPage';

const MyOwnPlaylist = () => {
  const [myBoards, setMyBoards] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const memberId = useSelector((state) => state.user.memberId);
  useEffect(() => {
    const getPlaylist = async () => {
      if (pageNum > 5) {
        return;
      }
      try {
        const response = await axios.get(`${API.BOARD}?page=${pageNum}`);
        const boardData = response?.data?.data;
        setMyBoards([
          ...myBoards,
          ...boardData.filter((brd) => brd.memberId === memberId),
        ]);
        setPageNum((count) => count + 1);
      } catch (e) {
        // console.error(e);
      }
    };
    getPlaylist();
  }, [pageNum]);
  return (
    <MyOwnPlaylistContainer>
      <div className='mytitle'>내 플레이리스트</div>
      <div className='myBoardContainer'>
        {myBoards?.map((brd) => (
          <Link to={`/playlist/${brd.boardId}`} key={brd.boardId}>
            <div className='myBoard'>
              <img src={brd.boardThumb} alt='playlist thumbnail' />
              <div className='title'>{brd.boardTitle}</div>
            </div>
          </Link>
        ))}
      </div>
    </MyOwnPlaylistContainer>
  );
};

export default MyOwnPlaylist;
