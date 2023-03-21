import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoMdAddCircleOutline, IoMdClose } from 'react-icons/io';

import {
  PlaylistInfoContainer,
  PlaylistInfoMain,
  PlaylistInfoModal,
} from '../../styles/playlist';

PlaylistInfoModal.setAppElement('#root');

const PlaylistInfo = ({ playlistData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);
  return (
    <PlaylistInfoContainer>
      <img src={playlistData.imgSrc} alt='playlist' />
      <div className='info'>
        <PlaylistInfoMain>
          <div className='title'>{playlistData.title}</div>
          <div className='desc'>{playlistData.description}</div>
          <button onClick={toggleIsModalOpen} className='moreInfo'>
            더보기
          </button>
          <PlaylistInfoModal
            isOpen={isModalOpen}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            onRequestClose={toggleIsModalOpen}>
            <IoMdClose
              onClick={toggleIsModalOpen}
              size='35'
              color='var(--color4)'
            />
            <div className='title'>{playlistData.title}</div>
            <div className='desc'>{playlistData.description}</div>
          </PlaylistInfoModal>
          <div className='btns'>
            <button className='btn1'>
              <FaPlay />
              <div>재생</div>
            </button>
            <button className='btn2'>
              <IoMdAddCircleOutline />
              <div>추가</div>
            </button>
            <button className='btn1'>
              <div>수정</div>
            </button>
          </div>
        </PlaylistInfoMain>
      </div>
    </PlaylistInfoContainer>
  );
};

export default PlaylistInfo;
