package com.main.server.follow.service;
import com.main.server.follow.entity.Follow;
import com.main.server.follow.repository.FollowRepository;
import com.main.server.member.entity.Member;
import com.main.server.member.service.FindMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowService {
    private final FindMemberService findMemberService;
    private final FollowRepository followRepository;
//맴버가 맴버를 좋아요 하면 그게 팔로우
    public void addFollow(Long id, Member follower) {
        //Member id 끌고오기
        Member target = findMemberService.id(id);
        //followRepository memberId가 없으면
        if (!followRepository.existsByFollowerAndTarget(follower,target)) {
            //followRepository에 추가
            followRepository.save(new Follow(follower, target));
        } //아니면 삭제
        else {
                followRepository.deleteByFollowerAndTarget(follower,target);
        }
    }
}

