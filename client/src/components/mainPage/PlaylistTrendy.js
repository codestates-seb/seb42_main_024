import {
  PlaylistTrendyContainer,
  PlaylistImageContainer,
  PlaylistTrendyInfoContainer,
  SongListContainer,
  Song,
} from '../../styles/playlist';
import { useState } from 'react';
import { TbPlayerPlay, TbPlayerPause } from 'react-icons/tb';
import { FaPlay } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import ReactModal from 'react-modal';

const dummyData = {
  playlistId: 1,
  playlistTitle: 'NewJeans',
  playlistImgSrc:
    'https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg?1d674a44faffa0ebd34d86c182463171/melon/resize/282/quality/80/optimize',
  playlistDesc: `레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹레트로한 분위기, 자연스러운 매력으로 K-POP의 새로운 신드롬을 예고하는 걸 그룹`,
  playlist: [
    {
      Id: 1,
      title: 'OMG',
      artist: 'NewJeans',
      src: '',
      imgSrc:
        'https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg?1d674a44faffa0ebd34d86c182463171/melon/resize/282/quality/80/optimize',
      playtime: '3:32',
    },
    {
      Id: 2,
      title: 'Ditto',
      artist: 'NewJeans',
      src: '',
      imgSrc:
        'https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg?1d674a44faffa0ebd34d86c182463171/melon/resize/282/quality/80/optimize',
      playtime: '3:06',
    },
    {
      Id: 3,
      title: 'Attention',
      artist: 'NewJeans',
      src: '',
      imgSrc:
        'https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg?1d674a44faffa0ebd34d86c182463171/melon/resize/282/quality/80/optimize',
      playtime: '3:00',
    },
    {
      Id: 4,
      title: 'Hype Boy',
      artist: 'NewJeans',
      src: '',
      imgSrc:
        'https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg?1d674a44faffa0ebd34d86c182463171/melon/resize/282/quality/80/optimize',
      playtime: '2:59',
    },
    {
      Id: 5,
      title: 'Cookie',
      artist: 'NewJeans',
      src: '',
      imgSrc:
        'https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg?1d674a44faffa0ebd34d86c182463171/melon/resize/282/quality/80/optimize',
      playtime: '3:56',
    },
    {
      Id: 6,
      title: 'Hurt',
      artist: 'NewJeans',
      src: '',
      imgSrc:
        'https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg?1d674a44faffa0ebd34d86c182463171/melon/resize/282/quality/80/optimize',
      playtime: '2:58',
    },
    {
      Id: 7,
      title: '?',
      artist: 'NewJeans',
      src: '',
      imgSrc:
        'https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg?1d674a44faffa0ebd34d86c182463171/melon/resize/282/quality/80/optimize',
      playtime: '2:58',
    },
    {
      Id: 8,
      title: '??',
      artist: 'NewJeans',
      src: '',
      imgSrc:
        'https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg?1d674a44faffa0ebd34d86c182463171/melon/resize/282/quality/80/optimize',
      playtime: '2:58',
    },
    {
      Id: 9,
      title: '???',
      artist: 'NewJeans',
      src: '',
      imgSrc:
        'https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg?1d674a44faffa0ebd34d86c182463171/melon/resize/282/quality/80/optimize',
      playtime: '2:58',
    },
  ],
  playlistTotalTime: '19:31',
};

const PlaylistImage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <PlaylistImageContainer>
      <img
        src={dummyData.playlistImgSrc}
        alt='playlist thumbnail'
        className={isPlaying ? '' : 'blurred'}
      />
      <button className='playBtn' onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <TbPlayerPause className='icon' size='50px' />
        ) : (
          <TbPlayerPlay className='icon' size='50px' />
        )}
      </button>
    </PlaylistImageContainer>
  );
};

const SongList = ({ songlist }) => {
  return (
    <SongListContainer>
      {songlist.map((song) => (
        <Song key={song.Id}>
          <img src={song.imgSrc} alt='song thumbnail' />
          <div className='info'>
            <div className='title'>{song.title}</div>
            <div className='artist'>{song.artist}</div>
          </div>
        </Song>
      ))}
    </SongListContainer>
  );
};

ReactModal.setAppElement('#root');

const PlaylistTrendyInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);
  return (
    <PlaylistTrendyInfoContainer>
      <div className='title'>{dummyData.playlistTitle}</div>
      <div className='desc'>{dummyData.playlistDesc}</div>
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
          {dummyData.playlistTitle}
        </p>
        <p style={{ marginTop: '20px', color: 'var(--color4)' }}>
          {dummyData.playlistDesc}
        </p>
      </ReactModal>
      <div className='btns'>
        <button className='btn1'>
          <FaPlay />
          <div>재생</div>
        </button>
      </div>
      {/* 노래 나열 컴포넌트 */}
      <SongList songlist={dummyData.playlist} />
    </PlaylistTrendyInfoContainer>
  );
};

const PlaylistTrendy = () => {
  return (
    <PlaylistTrendyContainer>
      <PlaylistImage />
      <PlaylistTrendyInfo />
    </PlaylistTrendyContainer>
  );
};

export default PlaylistTrendy;
