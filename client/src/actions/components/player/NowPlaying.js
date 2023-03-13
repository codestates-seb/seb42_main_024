import styled from 'styled-components';
import PlayBox from './PlayBox';
import Player from './Player';
const NowPlayingWrap = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  height: 80px;
  background-color: var(--color11);
  display: flex;
  padding-left: 18vw;
`;
function NowPlaying() {
    return (
        <NowPlayingWrap>
            <PlayBox />
            <Player />
        </NowPlayingWrap>
    );
}

export default NowPlaying;
