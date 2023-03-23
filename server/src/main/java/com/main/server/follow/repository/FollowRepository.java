package com.main.server.follow.repository;

import com.main.server.follow.dto.FollowResponseDto;
import com.main.server.follow.entity.Follow;
import com.main.server.member.entity.Member;
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
//    List<Follow> findByFollower(Member follower, Pageable pageable);


    //이건 내가 팔로우 하고 있는 유저들을 보여준다.
    @Query("SELECT new com.main.server.follow.dto.FollowResponseDto(f.target.id, f.target.email, f.target.nickname, f.target.picture) FROM Follow f WHERE f.follower = :follower")
    List<FollowResponseDto> findTargetsByFollower(@Param("follower") Member follower);


    // 이건 나를 팔로우 하고 있는 유저들을 보여준다.
    @Query("SELECT new com.main.server.follow.dto.FollowResponseDto(f.follower.id, f.follower.email, f.follower.nickname, f.follower.picture) FROM Follow f WHERE f.target = :target")
    List<FollowResponseDto> findFollowersByTarget(@Param("target") Member target);
}


