package com.main.server.member.service;

import com.main.server.auth.dto.OAuthAttributes;
import com.main.server.auth.util.CustomAuthorityUtils;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.follow.entity.Follow;
import com.main.server.follow.repository.FollowRepository;
import com.main.server.member.dto.MemberResponseDto;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    private final FindMemberService findMemberService;
    private final FollowRepository followRepository;

    public Member saveOrUpdate(OAuthAttributes attributes) {
        Member member = memberRepository.findByEmail(attributes.getEmail())
                .orElse(new Member(
                        attributes.getName(),
                        attributes.getEmail(),
                        attributes.getPicture(),
                        authorityUtils.createRoles(attributes.getEmail())));

        if (member.getMemberId() == null) {
            createMember(member);
        }

        return member;
    }

    public void createMember(Member member) {
        memberRepository.save(member);
    }

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Member findById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
