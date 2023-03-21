package com.main.server.follow.repository;

import com.main.server.follow.entity.Follow;
import com.main.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    boolean existsByMember(Member member);
    void deleteByMember(Member member);
}

