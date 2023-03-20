import { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';

import {
  LSBChatContianer,
  LSBHeaderContainer,
  LSBMemberContainer,
  LSBOutBtn,
  LSBPlayListContainer,
  LSBPlayListWrap,
  LiveroomSideBarContainer,
} from '../../styles/liveroomsidebar';
import LSBChat from '../LSBChat';
import LSBPlayList from '../LSBPlayList';

function LiveroomSideBar() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const dummyData = [
      {
        key: 1,
        singer: '누진세',
        musicTitle: '하입보잉',
        thumnailURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
        playtime: '3:30',
      },
      {
        key: 2,
        singer: '누진세',
        musicTitle: '하입보잉',
        thumnailURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
        playtime: '3:30',
      },
      {
        key: 3,
        singer: '누진세',
        musicTitle: '하입보잉',
        thumnailURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
        playtime: '3:30',
      },
      {
        key: 4,
        singer: '누진세',
        musicTitle: '하입보잉',
        thumnailURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
        playtime: '3:30',
      },
      {
        key: 6,
        singer: '누진세',
        musicTitle: '하입보잉',
        thumnailURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
        playtime: '3:30',
      },
      {
        key: 7,
        singer: '누진세',
        musicTitle: '하입보잉',
        thumnailURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
        playtime: '3:30',
      },
      {
        key: 8,
        singer: '누진세',
        musicTitle: '하입보잉',
        thumnailURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
        playtime: '3:30',
      },
    ];
    setdata(dummyData);
  }, []);
  return (
    <LiveroomSideBarContainer>
      <LSBHeaderContainer>
        <BsFillGearFill></BsFillGearFill>
        <LSBOutBtn>나가기</LSBOutBtn>
      </LSBHeaderContainer>
      <LSBPlayListContainer>
        <LSBMemberContainer></LSBMemberContainer>
        <LSBPlayListWrap>
          {data.map((e) => {
            return <LSBPlayList key={e.key} playListData={e}></LSBPlayList>;
          })}
        </LSBPlayListWrap>
      </LSBPlayListContainer>
      <LSBChatContianer>
        <LSBChat></LSBChat>
      </LSBChatContianer>
    </LiveroomSideBarContainer>
  );
}

export default LiveroomSideBar;
