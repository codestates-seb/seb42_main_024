import { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';

import styled from 'styled-components';

import LSBPlayList from './LSBPlayList';

const LiveroomSideBarContainer = styled.div`
  width: 1000px;
  height: 100vh;
  background-color: var(--color1);
  border: 1px solid var(--color3);
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const LSBHeaderContainer = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color9);
  font-size: 100px;
`;
const LSBPlayListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 45%;
`;
const LSBChatContianer = styled.div`
  margin-top: 20px;
  height: 45%;
`;
const LSBOutBtn = styled.button`
  font-size: 38px;
  font-weight: 600;
  width: 160px;
  height: 90px;
  border-radius: 10px;
`;

const LSBMemberContainer = styled.div`
  height: 10%;
`;

const LSBPlayListWrap = styled.div`
  border-radius: 20px;
  height: 90%;
  background-color: var(--color2);
  padding: 50px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

function LiveroomSideBar() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const dummyData = [
      {
        key: 1,
        singer: '누진스',
        musicTitle: '하입보잉',
        thumnailURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
        playtime: '3:30',
      },
      {
        key: 2,
        singer: '누진스',
        musicTitle: '하입보잉',
        thumnailURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
        playtime: '3:30',
      },
      {
        key: 3,
        singer: '누진스',
        musicTitle: '하입보잉',
        thumnailURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgD01x0AuTfakEpAznMC27k-2jSuoGMiu8mGo1aVuYkeGU_E0C1-_cH6WHNOyMcXGaW4&usqp=CAU',
        playtime: '3:30',
      },
      {
        key: 4,
        singer: '누진스',
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
      <LSBChatContianer></LSBChatContianer>
    </LiveroomSideBarContainer>
  );
}

export default LiveroomSideBar;
