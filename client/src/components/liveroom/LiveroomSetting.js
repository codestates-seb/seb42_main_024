import {
  LiveroomSettingContainer,
  LiveroomSettingView,
} from '../../styles/liveroomsetting';

function LiveroomSetting({ openSideBarSettingHandler }) {
  return (
    <LiveroomSettingContainer onClick={openSideBarSettingHandler}>
      <LiveroomSettingView></LiveroomSettingView>
    </LiveroomSettingContainer>
  );
}

export default LiveroomSetting;
