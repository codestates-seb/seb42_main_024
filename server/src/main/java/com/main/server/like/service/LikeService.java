package com.main.server.like.service;

import com.main.server.board.entity.Board;
import com.main.server.board.repository.BoardRepository;
import com.main.server.board.service.FindBoardService;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.like.entity.Like;
import com.main.server.like.repository.LikeRepository;
import com.main.server.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final FindBoardService findBoardService;



    public void addLike(Long id, Member member) {
        //findByBoardId 이걸로 보드 기준 세워줌
        Board board = findBoardService.id(id);
        //likeRepository에 memberId 없으면
    if (!likeRepository.existsByMemberAndBoard(member,board)) {
        // 호출되면 board에 있는 count 증가
        board.setLikeCount(board.getLikeCount()+1);
        // likeRepository에 memberId 값이랑 boardId값 저장해버림
        likeRepository.save(new Like(member, board));
        //아니면 삭제해라
    } else {
        board.setLikeCount(board.getLikeCount()-1);
        likeRepository.deleteByMemberAndBoard(member,board);

    }
  }
    //existsByMemberAndBoard 사용해서 값을 가져옴
    public boolean hasMemberLikedBoard(Member member, Board board) {
        return likeRepository.existsByMemberAndBoard(member, board);
    }

}
