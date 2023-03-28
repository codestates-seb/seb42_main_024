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
  margin: 50px 50px 100px 50px;
  padding: 70px;
  color: white;
  .commentsCnt {
    font-size: 15px;
    font-family: var(--ft-pretendardExtraBold);
    border-bottom: 1px solid yellow;
    margin-bottom: 5px;
  }
  .commentForm {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    textarea.comment {
      width: 500px;
      height: 50px;
      resize: none;
      background-color: transparent;
      color: white;
    }
    button.postBtn {
      border-radius: 5px;
    }
  }
  .commentWrapper {
    .editableComment {
      background-color: transparent;
    }
  }
`;

export const CommentContainer = styled.div`
  border-radius: 5px;
  margin: 5px 0;
  overflow: hidden;
  height: 50px;
  .editableComment {
    color: whitesmoke;
  }
`;
