import {
  PlayListBox,
  PlayListLiContainer,
  PlayListLiCover,
  PlayListLiContent,
  PlayListLiTitle,
  PlayListLiContentBox,
} from '../../styles/player/playlistli';
function PlayListLi() {
  return (
    <PlayListBox>
      <PlayListLiContainer>
        <PlayListLiCover />
        <PlayListLiContentBox>
          <PlayListLiTitle>2000/90</PlayListLiTitle>
          <PlayListLiContent>기리기리</PlayListLiContent>
        </PlayListLiContentBox>
        <p>0:00</p>
      </PlayListLiContainer>
    </PlayListBox>
  );
}

export default PlayListLi;
