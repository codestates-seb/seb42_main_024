import styled from 'styled-components';
export const PlayWarp = styled.div`
  width: 654px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 4.2vw;
`;
export const PlayerBtnContainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  color: var(--color7);
  margin-bottom: 10px;
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
  .PausetBtn {
    width: 50px;
    height: 35px;
    cursor: pointer;
  }
`;
export const PlayBox = styled.div`
  bottom: 10px;
  position: absolute;
  width: 600px;
  height: 5px;
  background-color: var(--color7);
  border-radius: 3px;
  cursor: pointer;
  :hover {
    height: 7px;
  }
`;
export const PlayBoxonProgress = styled.div`
  width: ${(props) => props.width || 0}%;
  height: 100%;
  background-color: var(--color10);
  border-radius: 3px;
`;
