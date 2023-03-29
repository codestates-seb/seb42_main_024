import { Link } from 'react-router-dom';

import PlaylistImage from './PlaylistImage';
import SongList from './Songlist';

import {
  PlaylistTrendyContainer,
  PlaylistTrendyInfoContainer,
} from '../../../styles/playlist';

const PlaylistTrendyInfo = ({ trendyBoard, trendyList }) => {
  return (
    <PlaylistTrendyInfoContainer>
      <Link to={`/playlist/${trendyBoard.boardId}`}>
        <div className='title'>{trendyBoard && trendyBoard.boardTitle}</div>
        <div className='desc'>{trendyBoard && trendyBoard.boardContent}</div>
        {/* 노래 나열 컴포넌트 */}
        {trendyList && <SongList songList={trendyList.songList} />}
      </Link>
    </PlaylistTrendyInfoContainer>
  );
};

const PlaylistTrendy = ({ trendyBoard, trendyList }) => {
  return (
    <PlaylistTrendyContainer>
      <PlaylistImage trendyBoard={trendyBoard} trendyList={trendyList} />
      <PlaylistTrendyInfo trendyBoard={trendyBoard} trendyList={trendyList} />
    </PlaylistTrendyContainer>
  );
};

export default PlaylistTrendy;
