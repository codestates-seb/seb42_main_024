package com.main.server.like.service;

import com.main.server.board.entity.Board;
import com.main.server.board.repository.BoardRepository;
import com.main.server.like.dto.LikeRequestDto;
import com.main.server.like.entity.Like;
import com.main.server.like.repository.LikeRepository;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;


    //좋아요 추가
    @Transactional
    public void add(LikeRequestDto likeRequestDto) throws Exception {
        Member member = memberRepository.findById(likeRequestDto.getMemberId())
                .orElseThrow(() -> new NotFoundException("맴버 아이디 못찿음 :" + likeRequestDto.getMemberId()));
        Board board = boardRepository.findById(likeRequestDto.getBoardId())
                .orElseThrow(() -> new NotFoundException("보드 아이디 못찿음 :" + likeRequestDto.getBoardId()));

        //Like가 이미 들어있으면 에러 반환
        if (likeRepository.findByMemberAndBoard(member, board).isPresent()) {
            //에러 출력
            throw new Exception();
        }
        Like like = Like.builder()
                .board(board)
                .member(member)
                .build();

        likeRepository.save(like);
        boardRepository.addLikeCount(board);
    }


    //좋아요 삭제
    @Transactional
    public void remove(LikeRequestDto likeRequestDto) {
        Member member = memberRepository.findById(likeRequestDto.getMemberId())
                .orElseThrow(() -> new NotFoundException("맴버 아이디 못찾음 :" + likeRequestDto.getMemberId()));
        Board board = boardRepository.findById(likeRequestDto.getBoardId())
                .orElseThrow(() -> new NotFoundException("보드 아이디 못찾음" + likeRequestDto.getBoardId()));

        Like like = Like.builder()
                .board(board)
                .member(member)
                .build();

        likeRepository.delete(like);
        boardRepository.subLikeCount(board);
    }


}
