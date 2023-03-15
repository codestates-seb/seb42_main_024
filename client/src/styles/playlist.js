import styled from 'styled-components';

// PlaylistPage - PlaylistInfoContainer component
export const PlaylistInfoContainer = styled.div`
  background-color: var(--color11);
  height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color9);
  .info {
    margin-left: 25px;
    .title {
      font-size: 50px;
      font-family: var(--ft-pretendardExtraBold);
      margin: 25px 0;
    }
    .desc {
      width: 584px;
      height: 122px;
      font-size: 15px;
      font-family: var(--ft-pretendardThin);
      overflow-y: hidden;
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
    .btns {
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 18px;
      button {
        width: 80px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid var(--color9);
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        &.btn1 {
          background-color: var(--color9);
        }
        &.btn2 {
          background-color: var(--color2);
          color: var(--color9);
        }
      }
    }
  }
`;

// PlaylistPage - PlaylistList component
export const PlaylistListContainer = styled.div`
  margin: 120px;
  background-color: var(--color2);
  padding: 100px;
  .row {
    background-color: inherit;
    border: none;
    width: 100%;
    display: flex;
    color: var(--color9);
    border-radius: 5px;
    margin: 5px 0;
    padding: 14px 30px;
    &:first-child {
      border-bottom: 1px solid var(--color3);
    }
    > * {
      flex-basis: 0;
      text-align: left;
    }
    .num {
      flex-grow: 1;
    }
    .title {
      flex-grow: 4;
    }
    .artist {
      flex-grow: 3;
    }
    .album {
      flex-grow: 3;
    }
    .playtime {
      flex-grow: 1;
      text-align: right;
    }
    &:not(:first-child):hover {
      background-color: rgba(217, 217, 217, 0.5);
    }
  }
`;

// PlaylistPage
export const PlaylistContainer = styled.div`
  height: 100vh;
  background-color: var(--color1);
  overflow-y: scroll;
`;

// MainPage - PlaylistTrendy component
export const PlaylistTrendyContainer = styled.div`
  width: 1260px;
  height: 350px;
  display: flex;
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

export const PlaylistTrendyInfoContainer = styled.div`
  width: 850px;
  background-color: var(--color11);
  color: var(--color9);
  padding-left: 25px;
  .title {
    font-size: 50px;
    font-family: var(--ft-pretendardExtraBold);
    margin: 15px 0;
  }
  .desc {
    width: 584px;
    height: 35px;
    font-size: 15px;
    font-family: var(--ft-pretendardThin);
    overflow-y: hidden;
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
  .btns {
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;
    button {
      width: 80px;
      height: 30px;
      border-radius: 5px;
      border: 1px solid var(--color9);
      font-size: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      &.btn1 {
        background-color: var(--color9);
      }
      &.btn2 {
        background-color: var(--color2);
        color: var(--color9);
      }
    }
  }
`;

export const SongListContainer = styled.div`
  /* width: 684px; */
  width: 450px;
  margin: 15px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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
    .title {
      font-size: 15px;
      font-family: var(--ft-pretendardExtraBold);
      margin: 5px 0;
    }
    .artist {
      font-size: 12px;
      font-family: var(--ft-pretendardThin);
    }
  }
`;

// MainPage - PlaylistThumbnail
export const PlaylistThumnailContainer = styled.div`
  width: 260px;
  color: var(--color9);
  position: relative;
  img.playlistImg {
    width: 100%;
    height: 260px;
    object-fit: cover;
  }
  img.onAir {
    width: 30px;
    position: absolute;
    right: 3px;
    bottom: 42px;
  }
  .title {
    font-family: var(--ft-pretendardSemiBold);
    font-size: 15px;
    margin: 5px 1px;
  }
  .flexBox {
    display: flex;
    justify-content: space-between;
    font-family: var(--ft-pretendardLight);
    .playtime {
      font-size: 10px;
    }
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
