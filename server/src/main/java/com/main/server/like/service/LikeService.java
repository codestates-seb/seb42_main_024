package com.main.server.like.service;

import com.main.server.board.entity.Board;
import com.main.server.board.service.FindBoardService;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.like.entity.Like;
import com.main.server.like.repository.LikeRepository;
import com.main.server.member.entity.Member;
import com.main.server.member.service.FindMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

import static com.main.server.like.entity.QLike.like;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final FindMemberService findMemberService;
    private final FindBoardService findBoardService;


    public void addLike(Long id,Long memberId, Integer like) {
        Member member = findMemberService.id(memberId);
        Board board = findBoardService.id(id);

        verifyExistsLike(member, board);
        likeRepository.save(board.addLike(new Like(like, member, board)));
    }

    public void verifyExistsLike(Member member, Board board) {
        Optional<Like> like = likeRepository.findByMemberAndBoard(member, board);
        if (like.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_LIKED);
        }
    }



}
