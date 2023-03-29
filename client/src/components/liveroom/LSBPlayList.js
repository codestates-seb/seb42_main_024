import {
  PlayMusicContainer,
  MisicThumnail,
  MusicInfo,
  MusicInfoText,
  MusicTitle,
} from '../../styles/lsbplaylist';

function LSBPlayList({ playListData }) {
  return (
    <PlayMusicContainer>
      <MusicInfo>
        <MisicThumnail src={playListData?.thumbnail}></MisicThumnail>
        <MusicInfoText>
          <MusicTitle>{playListData?.title}</MusicTitle>
        </MusicInfoText>
      </MusicInfo>
    </PlayMusicContainer>
  );
}

export default LSBPlayList;
