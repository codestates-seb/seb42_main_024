import styled from 'styled-components';

export const PlayMusicContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MusicInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: relative;
  color: var(--color9);
  font-size: 15px;
`;

export const MisicThumnail = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid var(--color9);
`;
export const MusicTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  word-break: keep-all;
`;
export const MusicInfoText = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
`;
