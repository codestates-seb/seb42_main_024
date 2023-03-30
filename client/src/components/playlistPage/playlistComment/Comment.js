import { useState, useRef, useEffect } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import axios from 'axios';

import { API } from '../../../config';
import { CommentContainer } from '../../../styles/playlistComment';

const Comment = ({ comment, commentsData, setCommentsData }) => {
  const [memberInfo, setMemberInfo] = useState({});
  const memberId = useSelector((state) => state.user.memberId);
  const editCommentRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  useEffect(() => {
    axios
      .get(`${API.MEMBER}/${comment?.memberId}`)
      .then((res) => setMemberInfo(res.data));
  }, []);

  const handleMouseDown = (e) => e.preventDefault();

  // 각각 코멘트 밖으로 마우스 나갈 때
  const handleCommentMouseOut = () => {
    setIsOptionModalOpen(false);
    setIsHovering(false);
  };

  const handleModalOpen = () => {
    setIsOptionModalOpen(true);
    editCommentRef.current.focus();
  };

  // 시간 차이 계산
  const getTimeDiff = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const timeDiff =
      now.getTime() - createdAtDate.getTime() - 9 * 60 * 60 * 1000;
    if (timeDiff / (24 * 60 * 60 * 1000) >= 1)
      return `${Math.floor(timeDiff / (24 * 60 * 60 * 1000))}일 전`;
    if (timeDiff / (60 * 60 * 1000) >= 1)
      return `${Math.floor(timeDiff / (60 * 60 * 1000))}시간 전`;
    if (timeDiff / (60 * 1000) >= 1)
      return `${Math.floor(timeDiff / (60 * 1000))}분 전`;
    return `방금`;
  };

  // 수정 버튼
  const handleEdit = (commentId) => {
    if (commentId !== undefined) {
      const storedAccessToken = localStorage.getItem('accessToken');
      axios.patch(
        `${API.COMMENT}/${commentId}/${memberId}`,
        { commentContent: editCommentRef.current.value },
        {
          headers: {
            Authorization: `${storedAccessToken}`,
            accept: 'application/json',
          },
        }
      );
      document.querySelector('input.editableComment').blur();
      setCommentsData(
        commentsData.map((c) => {
          if (c.commentId === commentId)
            return {
              ...c,
              commentContent: editCommentRef.current.value,
            };
          return c;
        })
      );
      setIsOptionModalOpen(false);
    }
  };

  // 삭제 버튼
  const handleDelete = (commentId) => {
    if (commentId !== undefined) {
      const storedAccessToken = localStorage.getItem('accessToken');
      axios.delete(`${API.COMMENT}/${commentId}/${memberId}`, {
        headers: {
          Authorization: `${storedAccessToken}`,
          accept: 'application/json',
        },
      });
      document.querySelector('input.editableComment').blur();
      setCommentsData(commentsData.filter((c) => c.commentId !== commentId));
      setIsOptionModalOpen(false);
    }
  };

  return (
    <CommentContainer
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={handleCommentMouseOut}>
      {/* 멤버 구글 이미지 */}
      <img src={memberInfo?.picture} alt='user' className='userImg' />
      {/* 이름, 코멘트 */}
      <div className='commentBody'>
        <div className='name-time'>
          <div className='name'>{memberInfo?.nickname}</div>
          <div className='createdAt'>{getTimeDiff(comment?.createdAt)}</div>
        </div>
        {comment.memberId !== memberId && (
          <div className='comment'>{comment.commentContent}</div>
        )}
        {comment.memberId === memberId && (
          <div className='editableCommentWrapper'>
            <input
              type='text'
              ref={editCommentRef}
              className={
                isOptionModalOpen
                  ? 'editableComment focusable'
                  : 'editableComment'
              }
              defaultValue={comment.commentContent}
            />
          </div>
        )}
      </div>
      {/* 수정, 삭제 */}
      {comment.memberId === memberId && (isHovering || isOptionModalOpen) && (
        <div className='udModalOpenerWrapper'>
          <button className='udModalOpener' onClick={handleModalOpen}>
            <HiOutlineDotsVertical />
          </button>
          {isOptionModalOpen && (
            <div className='option-modal'>
              <button
                className='editBtn'
                onClick={() => handleEdit(comment.commentId)}
                onMouseDown={handleMouseDown}>
                수정
              </button>
              <button
                className='deleteBtn'
                onClick={() => handleDelete(comment.commentId)}
                onMouseDown={handleMouseDown}>
                삭제
              </button>
            </div>
          )}
        </div>
      )}
    </CommentContainer>
  );
};

export default Comment;
