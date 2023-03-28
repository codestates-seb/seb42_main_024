import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

import {
  CommentContainer,
  PlaylistCommentContainerWrapper,
  PlaylistCommentContainer,
} from '../../styles/playlistComment';

const PlaylistComment = ({ boardId }) => {
  const [commentsData, setCommentsData] = useState(null);

  const memberId = useSelector((state) => state.user.memberId);
  // ref
  const commentRef = useRef(null);
  const editCommentRef = useRef(null);

  const [isOver, setIsOver] = useState(false);

  const [memberInfo, setMemberInfo] = useState({});
  console.log('global - ', memberInfo);

  useEffect(() => {
    axios.get(`http://15.165.199.44:8080/api/boards/${boardId}`).then((res) => {
      const comments = res.data.data.comments;
      setCommentsData(comments);
      // member info 가져오기
      const memberInfoObj = {};
      comments.forEach(async (c) => {
        if (!memberInfoObj[c.memberId]) {
          memberInfoObj[c.memberId] = await axios.get(
            `http://15.165.199.44:8080/api/members/${c.memberId}`
          );
        }
      });
      console.log('useeffect - ', memberInfoObj);
      setMemberInfo({ ...memberInfoObj });
    });
  }, []);

  const handlePostComment = () => {
    if (commentRef.current.value.length !== 0) {
      const storedAccessToken = localStorage.getItem('accessToken');
      const requestBody = {
        memberId,
        boardId,
        commentContent: commentRef.current.value,
      };
      axios
        .post(`http://15.165.199.44:8080/api/comments`, requestBody, {
          headers: {
            Authorization: `${storedAccessToken}`,
            accept: 'application/json',
          },
        })
        .then(console.log)
        .catch(console.log);
      commentRef.current.value = '';
      // 컴포넌트 단위 리렌더링을 위해
      setCommentsData([...commentsData, requestBody]);
    }
  };

  const handleEnterKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handlePostComment();
    }
  };

  const handleEdit = (commentId) => {
    // TODO: patch 개선 이후에 설정
    // axios
    //   .patch(
    //     `http://15.165.199.44:8080/api/comments/${commentId}/${memberId}`,
    //     { commentContent: editCommentRef.current.value }
    //   )
    //   .then(console.log)
    //   .catch(console.log);
    console.log(commentId, editCommentRef.current.value);
  };

  const handleDelete = (commentId) => {
    const storedAccessToken = localStorage.getItem('accessToken');
    axios.delete(
      `http://15.165.199.44:8080/api/comments/${commentId}/${memberId}`,
      {
        headers: {
          Authorization: `${storedAccessToken}`,
          accept: 'application/json',
        },
      }
    );
    setCommentsData(
      commentsData.filter((comment) => comment.commentId !== commentId)
    );
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
          <button className='postBtn' onClick={handlePostComment}>
            입력
          </button>
        </div>
        <div className='commentWrapper'>
          {/* // TODO: comment 응답객체 수정 후 적용 */}
          {commentsData?.map((comment) => (
            <CommentContainer
              key={comment.commentId}
              onMouseOver={() => setIsOver(true)}
              onMouseLeave={() => setIsOver(false)}>
              <div className='author'>{comment.memberId}</div>
              {!isOver && (
                <div className='content'>{comment.commentContent}</div>
              )}
              {isOver && comment.memberId === memberId && (
                <input
                  type='text'
                  ref={editCommentRef}
                  className='editableComment'
                  defaultValue={comment.commentContent}
                />
              )}
              {/* 수정 버튼 */}
              {isOver && comment.memberId === memberId && (
                <button
                  className='editBtn'
                  onClick={() => handleEdit(comment.commentId)}>
                  수정
                </button>
              )}
              {/* 삭제 버튼 */}
              {isOver && comment.memberId === memberId && (
                <button
                  className='deleteBtn'
                  onClick={() => handleDelete(comment.commentId)}>
                  삭제
                </button>
              )}
            </CommentContainer>
          ))}
        </div>
      </PlaylistCommentContainer>
    </PlaylistCommentContainerWrapper>
  );
};

export default PlaylistComment;
