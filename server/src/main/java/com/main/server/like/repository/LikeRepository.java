package com.main.server.like.repository;

import com.main.server.board.entity.Board;
import com.main.server.like.entity.Like;
import com.main.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like,Long> {
    //있는지 없는지 검토
    boolean existsByMemberAndBoard(Member member, Board board);
    //삭제
    void deleteByMemberAndBoard(Member member, Board board);
}
