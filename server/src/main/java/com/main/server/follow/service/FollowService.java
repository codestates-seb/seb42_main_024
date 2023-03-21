package com.main.server.follow.service;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowService {
    private final MemberRepository memberRepository;

    public void follow(Long followerId, Long followingId) {
        Member follower = memberRepository.findById(followerId)
                .orElseThrow(() -> new NotFoundException("Follower not found"));
        Member following = memberRepository.findById(followingId)
                .orElseThrow(() -> new NotFoundException("Following not found"));

        follower.addFollowing(following);
        memberRepository.save(follower);
    }

    public void unfollow(Long followerId, Long followingId) {
        Member follower = memberRepository.findById(followerId)
                .orElseThrow(() -> new NotFoundException("Follower not found"));
        Member following = memberRepository.findById(followingId)
                .orElseThrow(() -> new NotFoundException("Following not found"));

        follower.removeFollowing(following);
        memberRepository.save(follower);
    }
}

