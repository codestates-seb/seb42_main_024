import {
  LiveroomPopupContainer,
  LiveroomPopupView,
  CheckBtn,
  TextContainer,
} from '../../styles/liveroompopup';

function LiveroomPopup({ openSideBarSettingHandler }) {
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
            '페이지이동';
          }}>
          확인
        </CheckBtn>
      </LiveroomPopupView>
    </LiveroomPopupContainer>
  );
}

export default LiveroomPopup;
