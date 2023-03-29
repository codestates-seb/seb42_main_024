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
  openSideBarSettingHandler,
  members,
  setMembers,
  roomid,
  userNickName,
  setChangeSong,
  nextSongHandler,
  nowPlaySong,
  roomOwner,
}) {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  return (
    <LiveroomSideBarContainer>
      <LSBHeaderContainer>
        <BsFillGearFill
          className={roomOwner === userNickName ? null : 'hide'}
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
          <LSBPlayList
            key={nowPlaySong?.[3]?.videoid}
            playListData={nowPlaySong?.[3]}></LSBPlayList>
        </LSBPlayListWrap>
      </LSBPlayListContainer>
      <LSBChatContianer>
        <LSBChat
          setMembers={setMembers}
          roomid={roomid}
          message={message}
          setMessage={setMessage}
          sockClient={sockClient}
          chatDatas={chatDatas}
          userNickName={userNickName}></LSBChat>
      </LSBChatContianer>
      {isSettingModalOpen ? (
        <LiveroomSetter
          nextSongHandler={nextSongHandler}
          setChangeSong={setChangeSong}
          chatroomId={roomid}
          setIsSettingModalOpen={setIsSettingModalOpen}></LiveroomSetter>
      ) : null}
    </LiveroomSideBarContainer>
  );
}

export default LiveroomSideBar;
