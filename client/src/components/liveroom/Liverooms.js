import { LiveroomsContainer } from '../../styles/liverooms';

function Liverooms({ song, type }) {
  song;
  return (
    <LiveroomsContainer heightValue={type === 'ALL' ? '500' : null}>
      {song.key}
    </LiveroomsContainer>
  );
}

export default Liverooms;
