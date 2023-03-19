import PlayListLi from './PlayListLi';

import {
  PlayListContainer,
  PlayListUl,
  PlayListUlHeader,
} from '../../styles/player/playlist';
function PlayList() {
  return (
    <PlayListContainer>
      <PlayListUlHeader>플레이리스트 음악목록</PlayListUlHeader>
      <PlayListUl>
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
        <PlayListLi />
      </PlayListUl>
    </PlayListContainer>
  );
}

export default PlayList;
