import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import PlaylistComment from '../components/playlistPage/playlistComment/PlaylistComment';
import PlaylistInfo from '../components/playlistPage/PlaylistInfo';
import PlaylistList from '../components/playlistPage/PlaylistList';
import { API } from '../config';
import { PlaylistPageContainer } from '../styles/playlist';
import useScrollTop from '../util/useScrollTop';

const Playlist = () => {
  const { boardId } = useParams();
  // 수정 버튼 상태
  const [isEditing, setIsEditing] = useState(false);
  // props - axios data
  const [boardData, setBoardData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);

  useEffect(() => {
    axios.get(`${API.BOARD}/${boardId}`).then((res) => {
      setBoardData(res.data.data.board);
      setPlaylistData(res.data.data.playlist);
      setCommentsData(res.data.data.comments);
    });
  }, []);

  useScrollTop();

  return (
    <PlaylistPageContainer>
      <PlaylistInfo
        boardId={boardId}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        boardData={boardData}
        setBoardData={setBoardData}
        playlistData={playlistData}
        setPlaylistData={setPlaylistData}
      />
      <PlaylistList
        isEditing={isEditing}
        playlistData={playlistData}
        setPlaylistData={setPlaylistData}
      />
      <PlaylistComment
        boardId={boardId}
        commentsData={commentsData}
        setCommentsData={setCommentsData}
      />
    </PlaylistPageContainer>
  );
};

export default Playlist;
