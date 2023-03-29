import { useEffect, useState } from 'react';
import { MdOutlineLibraryMusic } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { API } from '../../../config';
import {
  CreateLiveRoomBox,
  HeaderBox,
  HeaderTitle,
  HeaderCloseBox,
  HeaderContainer,
  TitleHeader,
  Title,
  TotalSongs,
  AddPlayList,
  MyPlaylist,
  MyPlaylistBox,
  CreateBtn,
  Info,
  DeleteBtnBox,
} from '../../../styles/createroom';

const CreateRoom = ({ isCreateOpen, setIsCreateOpen }) => {
  const [titleValue, setTitleValue] = useState('');
  const [data, setData] = useState([]);
  const [postData, setPostData] = useState([]);
  const navigate = useNavigate();
  const handleTitleValue = (e) => {
    setTitleValue(e.target.value);
  };

  const handleAddData = (index) => {
    const clickedData = data[index];
    setPostData(clickedData);
  };

  const handleDeletePostData = () => {
    setPostData([]);
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const requestHeader = {
      headers: {
        Authorization: `${storedAccessToken}`,
        accept: 'application/json',
      },
    };
    axios.get(`${API.PLAYLIST}`, requestHeader).then((res) => {
      setData(res.data.data);
    });
  }, []);

  const PostLiveRoomCre = () => {
    const playlistId = postData.playlistId;
    const storedAccessToken = localStorage.getItem('accessToken');
    if (postData.length !== 0) {
      const requestHeader = {
        headers: {
          Authorization: `${storedAccessToken}`,
          accept: 'application/json',
        },
      };
      const requestBody = {
        title: titleValue,
        playlistId,
      };
      axios
        .post(`${API.LIVEROOM}`, requestBody, requestHeader)
        .then((res) => {
          setTitleValue('');
          setPostData([]);
          setIsCreateOpen((pre) => !pre);
          navigate(`/liverooms/${res.data.data.chatroomId}`);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert(123);
    }
  };

  return (
    <CreateLiveRoomBox isCreateOpen={isCreateOpen}>
      <HeaderBox>
        <HeaderContainer>
          <MdOutlineLibraryMusic className='LiveBtn' />
          <HeaderTitle>라이브 룸 만들기</HeaderTitle>
        </HeaderContainer>
        <HeaderCloseBox onClick={() => setIsCreateOpen((pre) => !pre)}>
          X
        </HeaderCloseBox>
      </HeaderBox>
      <TitleHeader>라이브 룸 이름</TitleHeader>
      <Title
        placeholder='입력해주세요!'
        type='text'
        onChange={handleTitleValue}
        value={titleValue}
      />
      <TotalSongs>라이브 룸 리스트</TotalSongs>
      <AddPlayList>
        {postData.length !== 0 && (
          <div key={postData.playlistId} className='ListMap'>
            <Info>
              <img
                src={postData.thumbnail}
                alt={postData.title}
                className='ListThumbnail'
              />
              <div className='ListTitle'>{postData.title}</div>
            </Info>
            <DeleteBtnBox onClick={handleDeletePostData}>
              <div className='DeleteBtn'>X</div>
            </DeleteBtnBox>
          </div>
        )}
        {postData.length === 0 && (
          <div className='null'>플레이리스트를 추가해 주세요!</div>
        )}
      </AddPlayList>
      <MyPlaylist>나만의 플레이리스트</MyPlaylist>
      <MyPlaylistBox>
        {data.map((list, index) => (
          <div key={list.playlistId} className='ListMap'>
            <Info onClick={() => handleAddData(index)}>
              <img
                src={list.thumbnail}
                alt={list.title}
                className='ListThumbnail'
              />
              <div className='ListTitle'>{list.title}</div>
            </Info>
          </div>
        ))}
      </MyPlaylistBox>
      <CreateBtn onClick={PostLiveRoomCre}>라이브 룸 만들기</CreateBtn>
    </CreateLiveRoomBox>
  );
};

export default CreateRoom;
