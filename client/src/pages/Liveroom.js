import styled from 'styled-components';

const LiveroomContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: var(--color1);
`;
const LiveroomMainBackground = styled.div`
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
const LiveAlbumCover = styled.img`
  width: 25vw;
  height: 25vw;
  border-radius: 50%;
  border: 10px solid var(--color8);
`;

function Liveroom() {
  return (
    <LiveroomContainer>
      <LiveroomMainBackground>
        <LiveAlbumCover src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-fA-Qx9lHnaUD54TND9pM2DfGvIOS-d5KgvTsdU&s'></LiveAlbumCover>
      </LiveroomMainBackground>
    </LiveroomContainer>
  );
}

export default Liveroom;