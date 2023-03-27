import { useEffect, useState } from 'react';
import { MdOutlineLibraryMusic } from 'react-icons/md';

import axios from 'axios';

import {
  CreateLiveRoomBox,
  HeaderBox,
  HeaderTitle,
  HeaderCloseBox,
  HeaderContainer,
  TitleHeader,
  Title,
  ContentBox,
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
  const [contentValue, setContentValue] = useState('');
  const [data, setData] = useState([]);
  const [postData, setPostData] = useState([]);
  const handleTitleValue = (e) => {
    setTitleValue(e.target.value);
  };
  const handleContentValue = (e) => {
    setContentValue(e.target.value);
    console.log(postData);
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
    axios
      .get('http://15.165.199.44:8080/api/playlists', requestHeader)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
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
        .post('http://15.165.199.44:8080/api/rooms', requestHeader, requestBody)
        .then(() => {
          setTitleValue('');
          setContentValue('');
          setPostData([]);
          setIsCreateOpen((pre) => !pre);
        })
        .catch((e) => {
          console.log(e);
        });
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
      <ContentBox
        placeholder='라이브 룸에 대한 간단한 설명을 적어주세요...'
        type='text'
        onChange={handleContentValue}
        value={contentValue}
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
