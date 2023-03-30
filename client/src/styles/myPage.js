import styled from 'styled-components';

export const MyPageContainer = styled.div`
  margin-left: 250px;
  width: 100%;
  height: 100vh;
  background-color: pink;
`;

export const MyListsContainer = styled.div`
  width: 100%;
  background-color: var(--color1);
  color: white;
  padding: 5%;
  padding-bottom: 10%;
`;

export const MyOwnPlaylistContainer = styled.div`
  width: 40%;
  .mytitle {
    font-size: 20px;
    font-family: var(--ft-pretendardSemiBold);
  }
  .myBoardContainer {
    border-radius: 5px;
    border: 1px solid whitesmoke;
    padding: 1.5%;
    .myBoard {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      border-radius: 5px;
      font-size: 15px;
      margin: 5px 0;
      &:hover {
        background-color: var(--color2);
      }
      img {
        width: 80px;
        height: 60px;
      }
      .title {
      }
    }
  }
`;

export const MyInfoContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: rgb(27, 27, 27);

  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 3%;
  gap: 1%;
  color: white;

  img.userPic {
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }
  .info {
    .name {
      font-size: 20px;
      font-family: var(--ft-pretendardSemiBold);
    }
    .email {
    }
  }
`;
