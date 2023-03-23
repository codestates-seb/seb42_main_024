package com.main.server.follow.service;
import com.main.server.follow.dto.FollowResponseDto;
import com.main.server.follow.entity.Follow;
import com.main.server.follow.repository.FollowRepository;
import com.main.server.member.entity.Member;
import com.main.server.member.service.FindMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

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

    //가장 최근 코드


    public List<FollowResponseDto> getTargets(Long followerId) {
        Member follower = findMemberService.id(followerId);
        return followRepository.findTargetsByFollower(follower);
    }

    public List<FollowResponseDto> getFollowers(Long targetId) {
        Member target = findMemberService.id(targetId);
        return followRepository.findFollowersByTarget(target);
    }
}


