package com.main.server.follow.repository;

import com.main.server.board.entity.Board;
import com.main.server.follow.entity.Follow;
import com.main.server.member.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    boolean existsByFollowerAndTarget(Member follower,Member target);
    //삭제
    void deleteByFollowerAndTarget(Member follower,Member target);

    //팔로워가 있는 db를 가져옴 list로 하나하나.
    //pagealbe 하면 해당 페이지 들고옴
    List<Follow> findByFollower(Member follower, Pageable pageable);
}


