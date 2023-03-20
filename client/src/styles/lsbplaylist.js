import styled from 'styled-components';

export const PlayMusicContainer = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 30px;
`;
export const MusicInfo = styled.div`
  display: flex;
  position: relative;
  color: var(--color5);
  font-size: 25px;
`;

export const UnderLine = styled.hr`
  margin-top: 10px;
  border: 1px solid var(--color5);
`;
export const MisicThumnail = styled.img`
  width: 70px;
  height: 70px;
`;
export const MusicTitle = styled.div``;
export const MusicSinger = styled.div``;
export const MusicInfoText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
export const MusicPlayTime = styled.div`
  position: absolute;
  right: 0;
  bottom: 5px;
`;
