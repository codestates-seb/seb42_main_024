import styled from 'styled-components';

export const PlayWarp = styled.div``;
export const NowPlayingWrap = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 80px;
  background-color: var(--color11);
  display: flex;
  padding-left: 18vw;
  border-top: 0.5px solid rgb(85, 85, 85);
  align-items: center;
`;
// Modal
export const PlayListBox = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 80px;
  left: 0;
  z-index: 20;
  transform: translateY(${(props) => (props.isOpen ? '0' : '120%')});
  transition: transform 0.2s ease-in-out;
`;
export const PlayListCover = styled.div`
  background-color: var(--color1);
  position: absolute;
  top: 0;
  right: 470px;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  display: flex;
  .logo {
    position: absolute;
    width: 55vh;
  }
`;
export const PlayListImg = styled.img`
  width: 55vh;
  height: 55vh;
  border-radius: 100%;
  border: 5px solid white;
  background-color: white;
  vertical-align: middle;
`;
