import { BsPeople } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import {
  LiveroomsContainer,
  LiveroomsThumbnail,
  LiveroomsThumbnailContianer,
  LiveroomsText,
  LiveroomsTitle,
  LiveroomsMain,
  LiveroomsOwner,
  LiveroomsViewCount,
  LiveroomsViewCountContianer,
  CDShape,
} from '../../styles/liverooms';

function Liverooms({ song, type }) {
  const navigate = useNavigate();
  const navinateHandler = () => {
    navigate(`/liverooms/:${song.chatroomId}`);
  };
  const isAllListSong = type === 'ALL';
  return (
    <LiveroomsContainer
      onClick={navinateHandler}
      heightValue={isAllListSong ? 600 : null}>
      <LiveroomsThumbnailContianer className={isAllListSong ? null : 'popular'}>
        {isAllListSong ? <CDShape></CDShape> : null}
        <LiveroomsThumbnail
          className={isAllListSong ? null : 'popular'}
          src={song.thumbnail}></LiveroomsThumbnail>
      </LiveroomsThumbnailContianer>
      <LiveroomsText>
        <LiveroomsTitle>{song.title}</LiveroomsTitle>
        <LiveroomsMain>
          <LiveroomsOwner>{song.owner}</LiveroomsOwner>
          <LiveroomsViewCountContianer>
            <BsPeople></BsPeople>
            <LiveroomsViewCount>{song.memberCount}</LiveroomsViewCount>
          </LiveroomsViewCountContianer>
        </LiveroomsMain>
      </LiveroomsText>
    </LiveroomsContainer>
  );
}

export default Liverooms;
