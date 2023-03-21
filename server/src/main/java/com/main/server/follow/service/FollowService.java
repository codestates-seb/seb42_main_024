package com.main.server.follow.service;
import com.main.server.board.entity.Board;
import com.main.server.follow.entity.Follow;
import com.main.server.follow.repository.FollowRepository;
import com.main.server.like.entity.Like;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
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

    public void addFollow(Long id) {
        Member member = findMemberService.id(id);

        if (!followRepository.existsByMember(member)) {
            followRepository.save(member.addFollow(new Follow(member)));
        } else {
                followRepository.deleteByMember(member);
        }
    }
}

