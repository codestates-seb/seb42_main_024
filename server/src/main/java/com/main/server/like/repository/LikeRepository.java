package com.main.server.like.repository;

import com.main.server.like.entity.Like;
import com.main.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like,Long> {
    //    @Query("select v from Like v where v.member = :member and v.board = :board")
    boolean existsByMember(Member member);
    void deleteByMember(Member member);
}
