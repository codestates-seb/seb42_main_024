import {
  PlayListBox,
  PlayListLiContainer,
  PlayListLiCover,
  PlayListLiContent,
  PlayListLiTitle,
  PlayListLiContentBox,
} from '../../styles/player/playlistli';
function PlayListLi({ data }) {
  return (
    <PlayListBox>
      <PlayListLiContainer>
        <PlayListLiCover src={data.thumbnail} />
        <PlayListLiContentBox>
          <PlayListLiTitle>{data.musicTitle}</PlayListLiTitle>
          <PlayListLiContent>{data.artist}</PlayListLiContent>
        </PlayListLiContentBox>
        <p>0:00</p>
      </PlayListLiContainer>
    </PlayListBox>
  );
}

export default PlayListLi;
