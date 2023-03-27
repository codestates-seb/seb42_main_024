import styled from 'styled-components';
export const CreateLiveRoomBox = styled.div`
  padding: 20px;
  background-color: #1c1c1c;
  color: white;
  width: 800px;
  height: 700px;
  position: absolute;
  top: 80px;
  left: 250px;
  z-index: -10;
  transform: translateX(${(props) => (props.isCreateOpen ? '0%' : '-150%')});
  transition: transform 0.2s ease-in-out;
`;
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const HeaderBox = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  .LiveBtn {
    width: 20px;
    height: 20px;
  }
`;
export const HeaderTitle = styled.div`
  font-weight: 700;
  margin-left: 5px;
  font-size: 20px;
  font-family: var(--ft-pretendardMedium);
`;
export const HeaderCloseBox = styled.button`
  color: var(--color9);
  background-color: #313540;
  border-radius: 25px;
  margin-right: 20px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  font-size: 15px;
  font-weight: 500;
  outline: none;
  border: none;
`;
export const TitleHeader = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-top: 20px;
`;
export const Title = styled.input`
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  height: 40px;
  outline: none;
  border-radius: 5px;
  color: white;
  border: none;
  background-color: #313540;
  ::placeholder {
    color: #8c8c8c; // placeholder의 색상
  }
`;
export const ContentBox = styled.textarea`
  padding: 10px;
  margin-top: 5px;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  max-height: 100px;
  min-height: 100px;
  height: 100px;
  outline: none;
  border-radius: 5px;
  color: white;
  vertical-align: top;
  background-color: #313540;
  border: none;
  ::placeholder {
    color: #8c8c8c; // placeholder의 색상
  }
`;
export const TotalSongs = styled.div`
  margin: 10px 0;
`;
export const AddPlayList = styled.div`
  width: 100%;
  height: 60px;
  align-items: center;
  border-radius: 5px;
  background-color: #313540;
  padding: 5px;
  .DeleteBtn {
    margin-right: 25px;
  }
  .ListMap {
    :hover {
      background-color: #676e82;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    .ListTitle {
      margin-left: 10px;
    }
    .info {
      display: flex;
      align-items: center;
      .ListThumbnail {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
    }
  }
  .null {
    color: #676e82;
  }
`;
export const MyPlaylist = styled.div`
  margin: 10px 0;
`;
export const MyPlaylistBox = styled.div`
  :hover {
    overflow-y: scroll;
  }
  border-radius: 5px;
  background-color: #313540;
  width: 100%;
  height: 200px;
  padding: 5px;
  .DeleteBtn {
    margin-right: 25px;
  }
  .ListMap {
    :hover {
      background-color: #676e82;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    .ListTitle {
      margin-left: 10px;
    }
  }
`;
export const CreateBtn = styled.div`
  border-radius: 8px;
  margin: 10px 0;
  width: 100%;
  height: 50px;
  display: flex;
  color: var(--color9);
  font-weight: 800;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  background-color: #313540;
  cursor: pointer;
  transition: background-color 0.5s ease-in-out;
  transition: color 0.5s ease-in-out;
  :hover {
    background-color: var(--color9);
    color: #313540;
  }
`;
export const Info = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  .ListThumbnail {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
`;
export const DeleteBtnBox = styled.div`
  cursor: pointer;
`;
