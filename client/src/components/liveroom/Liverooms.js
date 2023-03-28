import { useNavigate } from 'react-router-dom';

import { LiveroomsContainer } from '../../styles/liverooms';

function Liverooms({ song, type }) {
  const navigate = useNavigate();
  const navinateHandler = () => {
    navigate(`/liverooms/:${song.chatroomId}`);
  };
  return (
    <LiveroomsContainer
      onClick={navinateHandler}
      heightValue={type === 'ALL' ? '500' : null}>
      {song.chatroomId}
    </LiveroomsContainer>
  );
}

export default Liverooms;
