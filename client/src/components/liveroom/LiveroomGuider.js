import {
  LiveroomGuideImg,
  LiveroomGuideTextBox,
  LiveroomGuideContianer,
  LiveroomGuideImgContainer,
} from '../../styles/liveroomguider';

function LiveroomGuider({ guideData }) {
  return (
    <LiveroomGuideContianer>
      <LiveroomGuideImgContainer>
        <LiveroomGuideImg
          logo={guideData.key === 'logo' ? '125px' : null}
          src={guideData.img}></LiveroomGuideImg>
      </LiveroomGuideImgContainer>
      <LiveroomGuideTextBox>{guideData.text}</LiveroomGuideTextBox>
    </LiveroomGuideContianer>
  );
}

export default LiveroomGuider;
