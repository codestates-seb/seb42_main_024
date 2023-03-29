import styled from 'styled-components';
import 'animate.css';

export const PlaylistCreatorContainer = styled.div`
  width: 500px;
  height: fit-content;
  background-color: rgba(28, 28, 28);
  border-radius: 0 10px 10px 0;
  margin-left: 250px;
  padding: 15px;

  position: relative;
  left: 5px;
  top: -360px;

  /* if isOpenPlaylistCreator === "default"  */
  &.dpNone {
    display: none;
  }
  & > * {
    margin: 5px 0;
  }
  .create-or-close {
    margin-top: 0;
    display: flex;
    justify-content: space-between;
    button.create {
      background-color: #313540;
      border: none;
      border-radius: 5px;
      color: white;
      padding: 5px;
      &:hover {
        background-color: white;
        color: #313540;
      }
    }
    .closeIcon {
      font-size: 30px;
      color: white;
    }
  }

  input,
  textarea {
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: #313540;
    color: white;
    padding: 10px;
  }
  input.title {
    height: 30px;
  }
  textarea.desc {
    height: 60px;
    resize: none;
  }
  .alertModal {
    position: absolute;
    inset: 0;
    margin: auto;

    width: 150px;
    height: 40px;
    background-color: black;
    border: 1px solid var(--color9);
    opacity: 0.8;
    color: white;
    border-radius: 5px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const SearchUIContainer = styled.div`
  position: relative;
  & > * {
    margin: 5px 0;
  }
  .alertModal {
    position: absolute;
    inset: 0;
    margin: auto;

    background-color: red;
    color: white;
    width: 150px;
    height: 40px;
    border-radius: 5px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .searchBar {
    background-color: #313540;
    border-radius: 5px;
    padding: 0;

    display: flex;
    align-items: center;

    input.search-youtube {
      flex-grow: 1;
    }
    button.searchBtn {
      width: 50px;
      font-size: 20px;
      background-color: #313540;
      border: none;

      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        color: white;
      }
    }
  }
  .addedSongsInfo {
    color: white;
  }
  .addedSongs {
    background-color: #313540;
    border-radius: 5px;
    height: 108px;
    margin: 5px 0;
    padding: 5px 10px;
    overflow-y: scroll;

    position: relative;

    .addedSong {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin: 3px 0;

      .songInfo {
        border-radius: 5px;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: white;
        gap: 5px;
        &:hover {
          background-color: rgba(115, 122, 142, 0.5);
        }

        img.thumbnail {
          width: 53px;
          height: 30px;
        }
      }
      button.deleteBtn {
        background-color: inherit;
        border: none;
        &:hover {
          color: white;
        }
      }
    }
    .empty-playlist {
      color: ivory;
      font-size: 30px;

      position: absolute;
      inset: 0;
      margin: auto;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
export const SearchedSongsContainer = styled.div`
  width: 100%;
  max-height: 340px;
  margin: 5px 0;
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
