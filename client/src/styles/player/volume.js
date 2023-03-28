import styled from 'styled-components';
export const VolumeWarp = styled.div`
  margin-right: 1vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  .Volume {
    color: var(--color7);
    width: 35px;
    height: 35px;
  }
  &:hover .VolumeBarControl {
    opacity: 1;
  }
`;
export const VolumeBarControl = styled.input`
  opacity: 0;
  margin-left: 2vw;
  position: absolute;
  width: 100px;
  height: 4px;
  border-radius: 4px;
  transition: opacity 0.5s;
  appearance: none;
  outline: none;
  background: linear-gradient(
    to right,
    var(--color9) 0%,
    var(--color9) ${(props) => props.volume * 100}%,
    var(--color7) ${(props) => props.volume * 100}%,
    var(--color7) 100%
  );
  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: var(--color9);
    :active {
      width: 20px;
      height: 20px;
      transition: 0.2s;
    }
  }
`;
