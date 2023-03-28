import { useState } from 'react';
import { BsFillGearFill, BsPeople } from 'react-icons/bs';

import LiveroomSetter from './LiveroomSetter';
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
  openSideBarSettingHandler,
  members,
  roomid,
  userNickName,
  setChangeSong,
}) {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  return (
    <LiveroomSideBarContainer>
      <LSBHeaderContainer>
        <BsFillGearFill
          onClick={() => setIsSettingModalOpen(true)}></BsFillGearFill>
        <LSBOutBtn
          className='allow'
          onClick={(e) => {
            openSideBarSettingHandler(e);
          }}>
          나가기
        </LSBOutBtn>
      </LSBHeaderContainer>
      <LSBPlayListContainer>
        <LSBMemberContainer>
          <BsPeople></BsPeople>
          {members.length}
        </LSBMemberContainer>
        <LSBPlayListWrap>
          {songs?.map((e) => {
            return <LSBPlayList key={e.key} playListData={e}></LSBPlayList>;
          })}
        </LSBPlayListWrap>
      </LSBPlayListContainer>
      <LSBChatContianer>
        <LSBChat
          roomid={roomid}
          message={message}
          setMessage={setMessage}
          sockClient={sockClient}
          chatDatas={chatDatas}
          userNickName={userNickName}></LSBChat>
      </LSBChatContianer>
      {isSettingModalOpen ? (
        <LiveroomSetter
          setChangeSong={setChangeSong}
          chatroomId={roomid}
          setIsSettingModalOpen={setIsSettingModalOpen}></LiveroomSetter>
      ) : null}
    </LiveroomSideBarContainer>
  );
}

export default LiveroomSideBar;
