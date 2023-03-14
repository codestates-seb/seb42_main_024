import styled from 'styled-components';
import { GoPlay } from 'react-icons/go';
import { MdSkipNext } from 'react-icons/md';
const PlayWarp = styled.div`
  width: 654px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 4.2vw;
`;
const PlayerBtnContainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  color: var(--color7);
  .PreBtn {
    height: 30px;
    width: 30px;
    cursor: pointer;
    transform: scaleX(-1);
  }
  .NextBtn {
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
  .StartBtn {
    width: 50px;
    height: 35px;
    cursor: pointer;
  }
`;
const TestBox = styled.div`
  width: 600px;
  height: 5px;
  background-color: red;
  border-radius: 3px;
`;
function Player() {
  return (
    <PlayWarp>
      <PlayerBtnContainer>
        <MdSkipNext className='PreBtn' /> <GoPlay className='StartBtn' />
        <MdSkipNext className='NextBtn' />
      </PlayerBtnContainer>
      <TestBox />
    </PlayWarp>
  );
}

export default Player;
