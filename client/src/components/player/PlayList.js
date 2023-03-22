import { useSelector } from 'react-redux';

import PlayListLi from './PlayListLi';

import {
  PlayListContainer,
  PlayListUl,
  PlayListUlHeader,
} from '../../styles/player/playlist';
function PlayList() {
  const playData = useSelector((state) => state?.currentSongList);
  return (
    <PlayListContainer>
      <PlayListUlHeader>플레이리스트 음악목록</PlayListUlHeader>
      <PlayListUl>
        {playData &&
          playData.map((data) => <PlayListLi key={data.musicId} data={data} />)}
      </PlayListUl>
    </PlayListContainer>
  );
}

export default PlayList;
