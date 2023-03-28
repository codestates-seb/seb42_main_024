import { LiveroomsContainer } from '../../styles/liverooms';

function Liverooms({ song, type }) {
  return (
    <LiveroomsContainer heightValue={type === 'ALL' ? '500' : null}>
      {song.chatroomId}
    </LiveroomsContainer>
  );
}

export default Liverooms;
