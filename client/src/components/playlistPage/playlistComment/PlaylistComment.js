import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

import Comment from './Comment';

import { API } from '../../../config';
import {
  PlaylistCommentContainerWrapper,
  PlaylistCommentContainer,
} from '../../../styles/playlistComment';

const PlaylistComment = ({ boardId }) => {
  const [commentsData, setCommentsData] = useState(null);

  const user = useSelector((state) => state.user);
  // ref
  const commentRef = useRef(null);

  useEffect(() => {
    axios.get(`${API.BOARD}/${boardId}`).then((res) => {
      const comments = res.data.data.comments;
      setCommentsData(comments);
    });
  }, [commentsData]);

  const handlePostComment = () => {
    if (commentRef.current.value.length !== 0 && user) {
      const storedAccessToken = localStorage.getItem('accessToken');
      const requestBody = {
        memberId: user.memberId,
        boardId,
        commentContent: commentRef.current.value,
      };
      axios.post(`${API.COMMENT}`, requestBody, {
        headers: {
          Authorization: `${storedAccessToken}`,
          accept: 'application/json',
        },
      });
      commentRef.current.value = '';
      // 컴포넌트 단위 리렌더링을 위해
      setCommentsData([...commentsData, requestBody]);
    } else {
      commentRef.current.value = '빈 코멘트입니다';
      setTimeout(() => {
        commentRef.current.value = '';
      }, 1000);
    }
  };

  const handleEnterKeyDown = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      if (!e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        handlePostComment();
      }
    }
  };

  return (
    <PlaylistCommentContainerWrapper>
      <PlaylistCommentContainer>
        <div className='commentsCnt'>{`${commentsData?.length}개의 코멘트`}</div>
        <div className='commentForm'>
          <textarea
            type='text'
            className='comment'
            ref={commentRef}
            onKeyDown={handleEnterKeyDown}
            placeholder='코멘트를 입력하세요'
          />
          <div className='postBtnWrapper'>
            <button className='postBtn' onClick={handlePostComment}>
              입력
            </button>
          </div>
        </div>
        <div className='commentWrapper'>
          {/* // TODO: comment 응답객체 수정 후 적용 */}
          {commentsData?.map((comment) => (
            <Comment
              key={comment.commentId}
              comment={comment}
              commentsData={commentsData}
              setCommentsData={setCommentsData}
            />
          ))}
        </div>
      </PlaylistCommentContainer>
    </PlaylistCommentContainerWrapper>
  );
};

export default PlaylistComment;
