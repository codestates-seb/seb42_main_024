import {
  PlayMusicContainer,
  MisicThumnail,
  MusicInfo,
  MusicInfoText,
  MusicPlayTime,
  MusicSinger,
  MusicTitle,
  UnderLine,
} from '../../styles/lsbplaylist';

function LSBPlayList({ playListData }) {
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
