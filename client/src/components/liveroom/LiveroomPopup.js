import { useNavigate } from 'react-router-dom';

import {
  LiveroomPopupContainer,
  LiveroomPopupView,
  CheckBtn,
  TextContainer,
} from '../../styles/liveroompopup';

function LiveroomPopup({ openSideBarSettingHandler, sockClient }) {
  const navigate = useNavigate();
  return (
    <LiveroomPopupContainer
      className='allow'
      onClick={(e) => {
        openSideBarSettingHandler(e);
      }}>
      <LiveroomPopupView>
        <TextContainer>방을 나가시겠습니까?</TextContainer>
        <CheckBtn
          onClick={() => {
            navigate(`/`);
            sockClient.disconnect();
          }}>
          확인
        </CheckBtn>
      </LiveroomPopupView>
    </LiveroomPopupContainer>
  );
}

export default LiveroomPopup;
