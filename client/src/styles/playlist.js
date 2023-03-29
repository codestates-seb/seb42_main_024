import ReactModal from 'react-modal';

import styled from 'styled-components';

// PlaylistPage - PlaylistInfoContainer component
export const PlaylistInfoMain = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  div.header {
    height: 240px;
    display: flex;
    flex-direction: column;
    div.title {
      font-size: 50px;
      font-family: var(--ft-pretendardExtraBold);
      margin-bottom: 25px;
      min-height: 60px;
      max-height: 120px;
      overflow-y: hidden;
    }
    input.title {
      font-size: 50px;
      font-family: var(--ft-pretendardExtraBold);
      margin-bottom: 25px;
      background-color: transparent;
      border: none;
      color: white;
      outline: none;
      padding: 0;
      height: 60px;
      border-radius: 5px;
      &:focus {
        border: 0.5px solid white;
      }
    }
    div.desc {
      font-size: 15px;
      font-family: var(--ft-pretendardThin);
      flex-grow: 1;
      overflow-y: hidden;
      margin-bottom: 25px;
    }
    textarea.desc {
      width: 584px;
      height: 90px;
      resize: none;
      font-size: 15px;
      font-family: var(--ft-pretendardThin);
      overflow-y: hidden;
      background-color: transparent;
      color: white;
      border: none;
      border-radius: 5px;
      outline: none;
      &:focus {
        border: 0.5px solid white;
      }
    }
    .moreInfo {
      margin: 10px 0;
      background-color: var(--color11);
      border: 1px solid var(--color9);
      border-radius: 5px;
      color: var(--color9);
      width: 40px;
      height: 20px;
    }
    .emptySpace {
      margin: 10px 0;
      width: 40px;
      height: 20px;
    }
  }
  .footer {
    height: 120px;
    .heart {
      width: 15px;
      background-color: transparent;
      color: white;
      border: none;
      &.voted {
        color: var(--color10);
      }
    }
    .infoBtns {
      height: 30px;
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 18px;
      button {
        width: 80px;
        height: 30px;
        border-radius: 5px;
        border: none;
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        &.btn1 {
          background-color: var(--color9);
          &:hover {
            opacity: 0.7;
          }
        }
        &.btn2 {
          background-color: var(--color2);
          color: var(--color9);
          &:hover {
            opacity: 0.7;
          }
        }
        &.clicked {
          background-color: var(--color3);
          color: var(--color9);
          opacity: 0.7;
          &:hover {
            opacity: 0.5;
          }
        }
        &.deleteBtn {
          background-color: var(--color10);
          opacity: 0.7;
          color: white;
          border: none;
          &:hover {
            opacity: 0.5;
          }
        }
      }
    }
    .deleteModal {
      position: absolute;
      top: 293px;
      background-color: var(--color3);
      border: 1px solid var(--color4);
      border-radius: 5px;
      width: fit-content;
      height: fit-content;
      padding: 10px;
      .msg {
        font-size: 15px;
      }
      .deleteBtns {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        button {
          width: 50px;
          border: none;
          border-radius: 5px;
          &:hover {
            cursor: pointer;
          }
          button.delete {
            background-color: var(--color9);
          }
          button.cancel {
          }
        }
      }
    }
  }
`;

export const PlaylistInfoContainer = styled.div`
  background-color: var(--color11);
  height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  color: var(--color9);
  img.boardThumbnail {
    width: 480px;
    height: 360px;
  }
  .info {
    width: 584px;
    height: 360px;
    /* background-color: pink; */
  }
`;

// PlaylistPage - PlaylistInfo component - PlaylistInfoModal
export const PlaylistInfoModal = styled(ReactModal)`
  width: 584px;
  height: 584px;
  padding: 30px;
  background-color: var(--color11);
  border-radius: 5px;
  overflow-y: scroll;
  position: absolute;
  inset: 0;
  margin: auto;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: var(--color9);
      font-family: var(--ft-pretendardExtraBold);
      font-size: 40px;
    }
    .btns {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      .addBtn {
        background-color: var(--color3);
        color: var(--color7);
        border: none;
        border-radius: 5px;
        padding: 5px;
        &:hover {
          opacity: 0.7;
        }
      }
      .closeIcon {
        color: var(--color4);
        font-size: 40px;
        &:hover {
          color: white;
        }
      }
    }
  }
`;

// PlaylistPage - PlaylistInfo component - AddSongModal
export const AddSongModal = styled(ReactModal)``;

// PlaylistPage - PlaylistList component
export const PlaylistListContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlaylistListContainer = styled.div`
  width: 900px;
  margin: 100px 50px;
  background-color: var(--color2);
  padding: 70px;
  border-radius: 5px;
  .rowTitle {
    /* background-color: inherit; */
    color: white;
    /* width: 100%; */
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 2fr 9fr 2fr;
    gap: 5px;
    border-bottom: 1px solid white;
    margin: 5px 0;
    padding: 5px 0;
    /* padding: 0 30px; */
    & > * {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .deleteBtnWrapper {
      .deleteBtn {
        width: 80px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid var(--color9);
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .row {
    display: grid;
    grid-template-columns: 6fr 1fr;
    gap: 5px;
    border-radius: 5px;
    margin: 5px 0;
    &.checked {
      background-color: rgba(217, 217, 217, 0.6);
    }
    &:first-child {
      border-bottom: 1px solid var(--color3);
    }
    &:not(:first-child):hover {
      background-color: rgba(217, 217, 217, 0.5);
    }
    .songInfo {
      color: white;
      border: none;
      background-color: transparent;
      display: grid;
      grid-template-columns: 1fr 2fr 9fr;
      gap: 5px;
      & > * {
        height: 100%;
        display: flex;
        align-items: center;
      }
      .num {
        justify-content: center;
      }
      img.thumbnail {
        width: 100%;
      }
      .title {
        justify-content: start;
        padding-left: 10px;
      }
    }
    .selectDeleteWrapper {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      input.selectDelete {
        width: 15px;
        height: 15px;
      }
    }
  }
`;

// PlaylistPage
export const PlaylistContainer = styled.div`
  height: 100vh;
  background-color: var(--color1);
  overflow-y: scroll;
`;

export const PlaylistPageContainer = styled.div`
  background-color: var(--color1);
  margin-left: 250px;
  margin-bottom: 80px;
`;

// MainPage - PlaylistTrendy component
export const PlaylistTrendyContainer = styled.div`
  width: 1200px;
  height: 350px;
  display: flex;
  position: absolute;
  left: 300px;
  top: 50px;
`;

export const PlaylistImageContainer = styled.div`
  width: 410px;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    &.blurred {
      filter: blur(10px);
    }
  }
  button.playBtn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    .icon {
      color: var(--color4);
    }
  }
`;

export const PlaylistTrendyInfoContainer = styled(PlaylistInfoMain)`
  width: 850px;
  background-color: var(--color11);
  color: var(--color9);
  padding-left: 25px;

  .title {
    margin: 20px 0;
    font-size: 33px;
  }

  .desc {
    width: 90%;
    height: 35px;
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
`;

export const SongListContainer = styled.div`
  width: 450px;
  margin-top: ${(props) => (props.rowCount === 2 ? '45px' : '15px')};
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: ${(props) =>
    props.rowCount === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'};
  gap: 20px;
  align-items: center;
`;

export const Song = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  .info {
    color: var(--color9);
    margin-left: 10px;
    width: 115px;
    .title {
      font-size: 15px;
      font-family: var(--ft-pretendardExtraBold);
      margin: 5px 0;
      width: 115px;
      height: 15px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
`;

// MainPage - PlaylistThumbnail
export const PlaylistThumbnailContainer = styled.div`
  background-color: var(--color1);
  width: 260px;
  margin-right: 20px;
  margin-bottom: 20px;
  color: var(--color9);
  position: relative;
  flex: none;

  img.playlistImg {
    width: 100%;
    object-fit: cover;
    margin-bottom: 5px;
  }

  .title {
    font-family: var(--ft-pretendardSemiBold);
    font-size: 15px;
    margin: 5px 1px;
    height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .flexBox {
    display: flex;
    justify-content: space-between;
    font-family: var(--ft-pretendardLight);
    .author {
      display: flex;
      gap: 3px;
      margin: 1px;
      .displayName {
        font-size: 12px;
      }
    }
  }
`;
