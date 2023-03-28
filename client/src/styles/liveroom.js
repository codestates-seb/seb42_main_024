import styled from 'styled-components';

export const LiveroomContainer = styled.div`
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
  user-select: none;
  -webkit-user-drag: none;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  border: 10px solid var(--color8);
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
  position: absolute;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  top: 50%;
  transform: translate(0, -50%);
  height: 700px;
  display: flex;
`;

export const PlaySongTitle = styled.div`
  font-size: 20px;
  margin-top: 10px;
  color: var(--color9);
`;

export const PlayThumbnail = styled.img`
  margin-top: 20px;
  user-select: none;
  -webkit-user-drag: none;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  border: 10px solid var(--color8);
  transform: scale(1.4);
`;
