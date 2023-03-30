import styled from 'styled-components';

export const PlaylistCommentContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlaylistCommentContainer = styled.div`
  width: 900px;
  background-color: var(--color2);
  border-radius: 5px;
  margin: 0 50px 100px 50px;
  padding: 70px;
  color: white;
  .commentsCnt {
    font-size: 15px;
    font-family: var(--ft-pretendardExtraBold);
    /* border-bottom: 0.5px solid white; */
    margin-bottom: 5px;
  }
  .commentForm {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;
    textarea.comment {
      flex-grow: 1;
      height: 50px;
      resize: none;
      background-color: transparent;
      color: white;
      padding: 3px;
      border-radius: 5px;
    }
    .postBtnWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      button.postBtn {
        border: 0.5px solid ivory;
        padding: 3px;
        border-radius: 5px;
        background-color: transparent;
        text-align: center;
        color: white;
        &:hover {
          background-color: black;
        }
      }
    }
  }
  .commentWrapper {
  }
`;

export const CommentContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  img.userImg {
    width: 30px;
    height: 30px;
    border-radius: 100%;
  }
  .commentBody {
    flex-grow: 1;
    .name-time {
      margin-left: 3px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 5px;
      .name {
        color: white;
        font-size: 14px;
      }
      .createdAt {
        color: grey;
        font-size: 12px;
      }
    }

    .comment {
      padding: 3px;
      font-size: 14px;
    }
    .editableCommentWrapper {
      input.editableComment {
        border: none;
        background-color: transparent;
        color: white;
        padding: 3px;
        width: 100%;
        margin-right: 5px;
        font-size: 14px;
        pointer-events: none;
        :focus {
          outline: none;
          border-bottom: 0.5px solid white;
        }
        &.focusable {
          pointer-events: auto;
        }
      }
    }
  }
  .udModalOpenerWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &:hover {
      cursor: pointer;
    }
    .udModalOpener {
      width: 25px;
      height: 25px;
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 100%;
      background-color: transparent;
      color: white;
      font-size: 20px;
      :active {
        background-color: black;
      }
    }
    .option-modal {
      background-color: rgba(217, 217, 217, 0.5);
      position: absolute;
      top: 30px;
      width: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 5px;
      button {
        width: 100%;
        height: 20px;
        background-color: transparent;
        border: none;
        &:hover {
          background-color: rgba(217, 217, 217, 0.7);
        }
      }
    }
  }
`;
