import { MdOutlineLibraryMusic } from 'react-icons/md';

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
} from '../../../styles/createroom';
const CreateRoom = ({ isCreateOpen }) => {
  return (
    <CreateLiveRoomBox isCreateOpen={isCreateOpen}>
      <HeaderBox>
        <HeaderContainer>
          <MdOutlineLibraryMusic className='LiveBtn' />
          <HeaderTitle>라이브 룸 만들기</HeaderTitle>
        </HeaderContainer>
        <HeaderCloseBox>X</HeaderCloseBox>
      </HeaderBox>
      <TitleHeader>라이브 룸 이름</TitleHeader>
      <Title placeholder='입력해주세요!' type='text' />
      <ContentBox
        placeholder='라이브 룸에 대한 간단한 설명을 적어주세요...'
        type='text'
      />
      <TotalSongs>총 0개</TotalSongs>
      <AddPlayList />
      <MyPlaylist>나만의 플레이리스트</MyPlaylist>
      <MyPlaylistBox />
      <CreateBtn>라이브 룸 만들기</CreateBtn>
    </CreateLiveRoomBox>
  );
};

export default CreateRoom;
