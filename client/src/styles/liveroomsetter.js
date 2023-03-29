import styled from 'styled-components';

export const LiveroomSetterContianer = styled.div`
  width: 500px;
  background-color: rgba(28, 28, 28);
  border-radius: 5px 0 0 5px;
  padding: 10px;
  position: absolute;
  right: 650px;
  top: 20%;
  z-index: 5;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .modalTitle {
      width: fit-content;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 5px;
      color: white;
    }
    .modalBtns {
      width: fit-content;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 5px;
      .add {
        padding: 5px;
        text-align: center;
        background-color: grey;
        border-radius: 5px;
        border: none;
        color: var(--color1);
        font-weight: 600;
      }
      .close {
        display: flex;
        justify-content: center;
        background-color: transparent;
        color: white;
        border: none;
        font-size: 20px;
      }
    }
  }
  .newSong {
    font-size: 70px;
    font-weight: 600;
    margin: 10px 0;
    padding: 5px 10px;
    width: 100%;
    height: 120px;
    border-radius: 5px;
    background-color: #313540;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .newSongThumbnail {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .newSongTitle {
      width: 60%;
      height: 50%;
      line-height: 18px;
      font-size: 17px;
      color: white;
      display: flex;
      overflow: hidden;
      word-break: keep-all;
      @keyframes marquee {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(-50%);
        }
      }
    }
    .deletBtnWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      .deleteNewSong {
        background-color: transparent;
        color: var(--color9);
        border: none;
        font-size: 20px;
        &:hover {
          color: white;
        }
      }
    }
  }
  .searchBar {
    margin: 10px 0;
    padding: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background-color: #313540;
    border: none;
    border-radius: 5px;
    .search-youtube {
      flex-grow: 1;
      background-color: #313540;
      border: none;
      border-radius: 5px;
      color: white;
      padding: 3px;
    }
    .searchBtn {
      background-color: transparent;
      border: none;
      font-size: 20px;
      color: black;
      &:hover {
        color: white;
      }
    }
  }
`;

export const SearchedSongsContainer = styled.div`
  width: 100%;
  max-height: 480px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  overflow-y: scroll;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  .searched-song {
    border-radius: 5px;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;

    border: none;
    background-color: transparent;

    img.thumbnail {
      width: 100%;
    }
    .title {
      font-size: 12px;
      width: 100%;
      height: 33px;
      margin: 0;
      padding: 3px;
      color: white;
      background-color: rgba(47, 47, 47, 1);
      overflow-y: hidden;
    }
    .hovering {
      display: none;
    }
    &:hover .hovering {
      width: 100%;
      height: 100%;
      background-color: rgba(47, 47, 47, 0.5);

      position: absolute;
      inset: 0;
      margin: auto;

      display: flex;
      justify-content: center;
      align-items: center;

      .addIcon {
        color: white;
        font-size: 35px;
      }
    }
  }
`;
