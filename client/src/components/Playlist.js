import { FaPlay } from 'react-icons/fa';
import { IoMdAddCircleOutline, IoMdClose } from 'react-icons/io';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { setCurrentSongURL } from '../actions/actions';
import { useState } from 'react';
import {
  Container,
  InfoBoxContainer,
  ListBoxContainer,
} from '../styles/playlist';

ReactModal.setAppElement('#root');

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
      playtime: '3:32',
    },
    {
      Id: 2,
      title: 'Ditto',
      artist: 'NewJeans',
      src: '',
      playtime: '3:06',
    },
    {
      Id: 3,
      title: 'Attention',
      artist: 'NewJeans',
      src: '',
      playtime: '3:00',
    },
    {
      Id: 4,
      title: 'Hype Boy',
      artist: 'NewJeans',
      src: '',
      playtime: '2:59',
    },
    {
      Id: 5,
      title: 'Cookie',
      artist: 'NewJeans',
      src: '',
      playtime: '3:56',
    },
    {
      Id: 6,
      title: 'Hurt',
      artist: 'NewJeans',
      src: '',
      playtime: '2:58',
    },
  ],
  playlistTotalTime: '19:31',
};

const InfoBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);
  return (
    <InfoBoxContainer>
      <img
        src={dummyData.playlistImgSrc}
        alt='playlist'
        width='412px'
        height='350px'
      />
      <div className='info'>
        <div className='title'>{dummyData.playlistTitle}</div>
        <div className='desc'>{dummyData.playlistDesc}</div>
        <button
          onClick={toggleIsModalOpen}
          style={{
            margin: '10px 0',
            backgroundColor: 'var(--color11)',
            border: '1px solid white',
            borderRadius: '5px',
            color: 'white',
            width: '40px',
            height: '20px',
          }}>
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
          <button className='btn2'>
            <IoMdAddCircleOutline />
            <div>추가</div>
          </button>
          <button className='btn1'>
            <div>수정</div>
          </button>
        </div>
      </div>
    </InfoBoxContainer>
  );
};

const ListBox = () => {
  const dispatch = useDispatch();
  const handleSongClick = (song) => {
    const newURL = `https://www.youtube.com/results?search_query=${song.artist}+${song.title}`;
    dispatch(setCurrentSongURL(newURL));
    window.open(newURL);
  };
  return (
    <ListBoxContainer>
      <div className='row'>
        <div className='num'>{`${dummyData.playlist.length}곡`}</div>
        <div className='title'>제목</div>
        <div className='artist'>아티스트</div>
        <div className='album'>앨범</div>
        <div className='playtime'>{dummyData.playlistTotalTime}</div>
      </div>
      {dummyData.playlist.map((song, idx) => (
        <button
          key={song.Id}
          className='row'
          onClick={() => handleSongClick(song)}>
          <div className='num'>{`${idx + 1}`}</div>
          <div className='title'>{song.title}</div>
          <div className='artist'>{song.artist}</div>
          <div className='album'>{''}</div>
          <div className='playtime'>{song.playtime}</div>
        </button>
      ))}
    </ListBoxContainer>
  );
};

const Playlist = () => {
  return (
    <Container>
      <InfoBox />
      <ListBox />
    </Container>
  );
};

export default Playlist;
