import styled from 'styled-components';

export const LiveroomContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: var(--color1);
  z-index: 0;
  .hidden {
    display: none;
  }
`;
export const LiveroomMainBackground = styled.div`
  width: calc(100% - 600px);
  height: 100%;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  user-select: none;
  -webkit-user-drag: none;
  object-fit: fill;
  ::after {
    width: 100%;
    height: 100%;
    content: '';
    background: ${(props) => `url(${props.backgroundurl})`};
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(150px);
  }
  overflow: hidden;
`;
export const LiveroomCover = styled.div`
  width: 600px;
  height: 600px;
  position: relative;
`;

export const LiveAlbumCover = styled.img`
  position: relative;
  z-index: 5;
  user-select: none;
  -webkit-user-drag: none;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  border: 10px solid rgba(0, 0, 0, 0);
  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }
  &:not(.done) {
    animation: rotate_image 30s linear infinite;
  }
`;

export const LiveRoomBtnContianer = styled.div`
  position: absolute;
  height: 100%;
  width: 40px;
  right: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LiveRoomBtn = styled.button`
  width: 100%;
  height: 100px;
  border: 1px solid var(--color1);
  background-color: var(--color1);
  border-radius: 30%;
  border-right: 10px solid var(--color1);
`;

export const LiveroomSoundBackground = styled.div`
  z-index: 7;
  position: absolute;
  top: 0;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 1, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-shadow: 4px 4px 4px gray;
  color: var(--color9);
  font-size: 150px;
  font-weight: 600;
  -webkit-user-drag: none;
  user-select: none;
  > svg {
    font-size: 200px;
    stroke-width: 0.5px;
    filter: drop-shadow(4px 4px 4px gray);
  }
`;
export const PlayList = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  height: 700px;
  display: flex;
  .swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const PlaySongTitle = styled.div`
  font-size: 20px;
  margin-top: 10px;
  color: var(--color9);
`;

export const PlayThumbnailContainer = styled.div`
  -webkit-user-drag: none;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

export const PlayThumbnail = styled.img`
  user-select: none;
  -webkit-user-drag: none;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  border: 10px solid rgba(0, 0, 0, 0);
  position: relative;
  z-index: 5;
`;

export const ProgessContinaer = styled.div.attrs((props) => ({
  style: {
    height: props.songProgress + '%',
    backgroundColor: props.bgrColor,
    zIndex: props.zIndex,
  },
}))`
  position: absolute;
  width: 600px;
  top: 0;
  left: 0;
`;

export const CDShape = styled.div`
  width: 25%;
  height: 25%;
  border: 5px solid var(--color8);
  border-radius: 50%;
  position: absolute;
  z-index: 6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  background-color: var(--color1);
`;

export const LiveroomGuide = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LiveroomGuideview = styled.div`
  width: 560px;
  min-height: 670px;
  background-color: var(--color1);
  border-radius: 20px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-user-drag: none;
  user-select: none;
  .swiper-pagination-bullet {
    background-color: var(--color9);
  }
`;

export const LiveroomEndContainer = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  height: 700px;
  z-index: 11;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LiveroomEndText = styled.div`
  color: var(--color9);
  word-break: keep-all;
  font-size: 120px;
  font-weight: 600;
`;

export const AlarmContainer = styled.audio``;
