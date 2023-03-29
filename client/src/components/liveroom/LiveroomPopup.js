import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import {
  LiveroomPopupContainer,
  LiveroomPopupView,
  CheckBtn,
  TextContainer,
  CheckBtnContainer,
} from '../../styles/liveroompopup';

function LiveroomPopup({
  openSideBarSettingHandler,
  sockClient,
  roomOwner,
  userNickName,
  roomid,
  accessToken,
}) {
  const navigate = useNavigate();
  const [popupText, setPopupText] = useState('방을 나가시겠습니까?');
  const [checkDeleteRoom, setCheckDeleteRoom] = useState(false);

  const deleteRoomHandler = () => {
    axios.delete(`http://15.165.199.44:8080/api/rooms/${roomid}`, {
      headers: {
        Authorization: `${accessToken}`,
        accept: 'application/json',
      },
    });
  };
  return (
    <LiveroomPopupContainer
      className='allow'
      onClick={(e) => {
        openSideBarSettingHandler(e);
      }}>
      <LiveroomPopupView>
        <TextContainer>{popupText}</TextContainer>
        <CheckBtnContainer>
          <CheckBtn
            onClick={() => {
              if (checkDeleteRoom) {
                deleteRoomHandler();
              }
              navigate(`/`);
              sockClient.disconnect();
            }}>
            확인
          </CheckBtn>
          {roomOwner === userNickName && !checkDeleteRoom ? (
            <CheckBtn
              onClick={() => {
                setPopupText('정말로 방을 삭제하시겠습니까?');
                setCheckDeleteRoom(true);
              }}>
              방 삭제하기
            </CheckBtn>
          ) : null}
        </CheckBtnContainer>
      </LiveroomPopupView>
    </LiveroomPopupContainer>
  );
}

export default LiveroomPopup;
