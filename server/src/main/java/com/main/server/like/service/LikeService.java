package com.main.server.like.service;

import com.main.server.board.entity.Board;
import com.main.server.board.service.FindBoardService;
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


    public void addLike(Long id, Member member, Integer like) {
        Board board = findBoardService.id(id);

    if (!likeRepository.existsByMember(member)) {

        likeRepository.save(board.addLike(new Like(like, member, board)));
    } else {
        likeRepository.deleteByMember(member);
    }
  }
}
