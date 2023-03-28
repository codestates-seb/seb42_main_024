import { useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaylistComment from '../components/playlistPage/PlaylistComment';
import PlaylistInfo from '../components/playlistPage/PlaylistInfo';
import PlaylistList from '../components/playlistPage/PlaylistList';
import { PlaylistPageContainer } from '../styles/playlist';

const Playlist = () => {
  const { boardId } = useParams();
  // 수정 버튼 상태
  const [isEditing, setIsEditing] = useState(false);
  return (
    <PlaylistPageContainer>
      <PlaylistInfo
        boardId={boardId}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <PlaylistList boardId={boardId} isEditing={isEditing} />
      <PlaylistComment boardId={boardId} />
    </PlaylistPageContainer>
  );
};

export default Playlist;
