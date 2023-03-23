import styled from 'styled-components';

export const LiveroomContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: var(--color1);
  z-index: 0;

  @keyframes hide {
    from {
      width: 100%;
    }
    to {
      width: 0;
    }
  }
  .hidden {
    animation: hide, 1s, 1s, ease-in;
  }
`;
export const LiveroomMainBackground = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  ::after {
    width: 100%;
    height: 100%;
    content: '';
    background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-fA-Qx9lHnaUD54TND9pM2DfGvIOS-d5KgvTsdU&s');
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(150px);
  }
  overflow: hidden;
`;
export const LiveAlbumCover = styled.img`
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
