package com.main.server.like.service;

import com.main.server.board.entity.Board;
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
        Board board = findBoardService.id(id);
        //likeRepository에 없으면 추가하고
    if (!likeRepository.existsByMember(member)) {

        likeRepository.save(board.addLike(new Like(member, board)));
        //아니면 삭제해라
    } else {
        likeRepository.deleteByMember(member);
    }
  }

    public void deleteLike(Long id, Member member) {
        Board board = findBoardService.id(id);
        //likeRepository에 있으면 삭제하고
        if (likeRepository.existsByMember(member)) {
            likeRepository.deleteByMember(member);
            //아니면 메세지
        } else
            {   //없으면 Internal Server Error 터질꺼임
                throw new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND);
            }

    }

}
