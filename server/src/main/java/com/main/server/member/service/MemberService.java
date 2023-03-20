package com.main.server.member.service;

import com.main.server.auth.dto.OAuthAttributes;
import com.main.server.auth.util.CustomAuthorityUtils;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
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

    @PostConstruct
    public void init() {
        Member member = Member.builder()
                .nickname("admin")
                .email("admin@google.com")
                .roles(List.of("USER"))
                .build();

        memberRepository.save(member);
    }

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
}
