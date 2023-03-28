import styled from 'styled-components';

export const PlayListBox = styled.div``;
export const PlayListLiContainer = styled.li`
  color: white;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 20px;
  padding: 8px;
  border-bottom: 0.5px solid rgb(85, 85, 85);
  background-color: ${(props) =>
    props.index === props.currentSongIdx ? 'var(--color2)' : 'none'};
  .PlayBtn {
    cursor: pointer;
    width: 20px;
    height: 20px;
    visibility: ${(props) =>
      props.index === props.currentSongIdx ? 'visible' : 'hidden'};
    position: absolute;
    margin: 0 15px;
  }
  .PauseBtn {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    margin: 0 15px;
  }
  :hover {
    .PlayBtn {
      visibility: visible;
    }
  }
`;
export const PlayListTimeBox = styled.div`
  width: 50px;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  .hover-text {
    font-size: 25px;
  }
`;
export const PlayListLiCover = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 5px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  cursor: pointer;
`;
export const PlayListLiContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 310px;
  height: 45px;
`;
export const PlayListLiTitle = styled.span`
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
  width: 250px;
  font-size: 15px;
  font-family: var(--ft-pretendardBold);
  ${({ isHover }) =>
    isHover &&
    `
      text-indent: 0;
      animation: marquee 20s linear infinite;
      @keyframes marquee {
        from {
          text-indent: 0;
        }
        to {
          text-indent: -100%;
        }
      }
    `}
`;
export const PlayListLiContent = styled.span`
  font-family: var(--ft-pretendardRegular);
  font-size: 12px;
`;
export const PlayListDelete = styled.div``;
