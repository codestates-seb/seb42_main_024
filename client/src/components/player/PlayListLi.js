import {
  PlayListBox,
  PlayListLiContainer,
  PlayListLiCover,
  PlayListLiTitle,
  PlayListLiContentBox,
} from '../../styles/player/playlistli';
function PlayListLi({ data }) {
  return (
    <PlayListBox>
      <PlayListLiContainer>
        <PlayListLiCover src={data.thumbnail} />
        <PlayListLiContentBox>
          <PlayListLiTitle>{data.title}</PlayListLiTitle>
        </PlayListLiContentBox>
        <p>0:00</p>
      </PlayListLiContainer>
    </PlayListBox>
  );
}

export default PlayListLi;
