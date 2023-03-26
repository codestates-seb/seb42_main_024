import { BsFillGearFill } from 'react-icons/bs';

import LSBChat from './LSBChat';
import LSBPlayList from './LSBPlayList';

import {
  LSBChatContianer,
  LSBHeaderContainer,
  LSBMemberContainer,
  LSBOutBtn,
  LSBPlayListContainer,
  LSBPlayListWrap,
  LiveroomSideBarContainer,
} from '../../styles/liveroomsidebar';

function LiveroomSideBar({
  message,
  setMessage,
  sockClient,
  chatDatas,
  songs,
}) {
  return (
    <LiveroomSideBarContainer>
      <LSBHeaderContainer>
        <BsFillGearFill></BsFillGearFill>
        <LSBOutBtn>나가기</LSBOutBtn>
      </LSBHeaderContainer>
      <LSBPlayListContainer>
        <LSBMemberContainer></LSBMemberContainer>
        <LSBPlayListWrap>
          {songs.map((e) => {
            return <LSBPlayList key={e.key} playListData={e}></LSBPlayList>;
          })}
        </LSBPlayListWrap>
      </LSBPlayListContainer>
      <LSBChatContianer>
        <LSBChat
          message={message}
          setMessage={setMessage}
          sockClient={sockClient}
          chatDatas={chatDatas}></LSBChat>
      </LSBChatContianer>
    </LiveroomSideBarContainer>
  );
}

export default LiveroomSideBar;
