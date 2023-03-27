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
`;
export const PlayBoxonProgress = styled.input`
  position: absolute;
  width: ${(props) => props.width || 0}%;
  height: 100%;
  border-radius: 3px;
  appearance: none;
  outline: none;
  background: linear-gradient(
    to right,
    var(--color10) 0%,
    var(--color10) ${(props) => props.progress * 100}%,
    var(--color10) ${(props) => props.progress * 100}%,
    var(--color10) 100%
  );
  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: var(--color10);
    :active {
      width: 20px;
      height: 20px;
      transition: 0.5s;
    }
  }
`;
