package com.main.server.like.repository;

import com.main.server.board.entity.Board;
import com.main.server.like.entity.Like;
import com.main.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like,Long> {

    Optional<Like> findByMemberAndBoard(Member member, Board board);

}
