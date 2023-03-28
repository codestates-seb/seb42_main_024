import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import ReactModal from 'react-modal';

import PlaylistImage from './PlaylistImage';
import SongList from './Songlist';

import {
  PlaylistTrendyContainer,
  PlaylistTrendyInfoContainer,
} from '../../../styles/playlist';

ReactModal.setAppElement('#root');

const PlaylistTrendyInfo = ({ trendyBoard, trendyList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);
  return (
    <PlaylistTrendyInfoContainer>
      <div className='title'>{trendyBoard && trendyBoard.boardTitle}</div>
      <div className='desc'>{trendyBoard && trendyBoard.boardContent}</div>
      <button onClick={toggleIsModalOpen} className='moreInfo'>
        더보기
      </button>
      <ReactModal
        isOpen={isModalOpen}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={toggleIsModalOpen}
        style={{
          content: {
            width: '584px',
            height: '584px',
            margin: 'auto',
            backgroundColor: 'var(--color11)',
            padding: '30px',
          },
        }}>
        <IoMdClose
          onClick={toggleIsModalOpen}
          size='35'
          color='var(--color4)'
        />
        <p
          style={{
            color: 'var(--color9)',
            fontFamily: 'var(--ft-pretendardExtraBold)',
            fontSize: '50px',
          }}>
          {trendyList && trendyList.title}
        </p>
        <p style={{ marginTop: '20px', color: 'var(--color4)' }}>
          {trendyBoard && trendyBoard.boardContent}
        </p>
      </ReactModal>
      <div className='btns'>
        <button className='btn1'>
          <FaPlay />
          <div>재생</div>
        </button>
      </div>
      {/* 노래 나열 컴포넌트 */}
      {trendyList && <SongList songList={trendyList.songList} />}
    </PlaylistTrendyInfoContainer>
  );
};

const PlaylistTrendy = ({ trendyBoard, trendyList }) => {
  return (
    <PlaylistTrendyContainer>
      <PlaylistImage trendyBoard={trendyBoard} />
      <PlaylistTrendyInfo trendyBoard={trendyBoard} trendyList={trendyList} />
    </PlaylistTrendyContainer>
  );
};

export default PlaylistTrendy;
