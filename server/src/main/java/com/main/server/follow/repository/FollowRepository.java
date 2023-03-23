package com.main.server.follow.repository;

import com.main.server.board.entity.Board;
import com.main.server.follow.entity.Follow;
import com.main.server.member.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
//    @Query("SELECT f.target FROM Follow f")
    boolean existsByFollowerAndTarget(Member follower,Member target);
    //삭제
    void deleteByFollowerAndTarget(Member follower,Member target);

    //팔로워가 있는 db를 가져옴 list로 하나하나.
    //pagealbe 하면 해당 페이지 들고옴
    List<Follow> findByFollower(Member follower, Pageable pageable);

//    @Query("SELECT f.target FROM Follow f WHERE f.follower = :follower")
//    @Query("SELECT f.target FROM Follow f")
//@Query("SELECT f.target.id FROM Follow f WHERE f.follower = :follower")

    //이건 내가 팔로우 하고 있는 유저들을 보여준다.
    @Query("SELECT f.target.id FROM Follow f WHERE f.follower = :follower")

    List<Long> findTargetIdsByFollower(@Param("follower") Member follower);


    // 이건 나를 팔로우 하고 있는 유저들을 보여준다.
    @Query("SELECT f.follower.id FROM Follow f WHERE f.target = :target")
    List<Long> findFollowerIdsByTarget(@Param("target") Member target);
}


