import styled from 'styled-components';

const PlayMusicContainer = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 60px;
`;
const MusicInfo = styled.div`
  display: flex;
  position: relative;
  color: var(--color5);
  font-size: 30px;
`;

const UnderLine = styled.hr`
  margin-top: 10px;
  border: 1px solid var(--color5);
`;
const MisicThumnail = styled.img`
  width: 100px;
  height: 100px;
`;
const MusicTitle = styled.div``;
const MusicInfoText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const MusicSinger = styled.div``;
const MusicPlayTime = styled.div`
  position: absolute;
  right: 0;
  bottom: 20px;
`;

function LSBPlayList({ playListData }) {
  console.log(playListData);
  return (
    <PlayMusicContainer>
      <MusicInfo>
        <MisicThumnail src={playListData.thumnailURL}></MisicThumnail>
        <MusicInfoText>
          <MusicSinger>{playListData.singer}</MusicSinger>
          <MusicTitle>{playListData.musicTitle}</MusicTitle>
        </MusicInfoText>
        <MusicPlayTime>{playListData.playtime}</MusicPlayTime>
      </MusicInfo>
      <UnderLine />
    </PlayMusicContainer>
  );
}

export default LSBPlayList;
