package com.main.server.member.controller;

import com.main.server.member.dto.MemberSimpleDto;
import com.main.server.member.entity.Member;
import com.main.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/auth")
    public ResponseEntity getAuthMemberInfo(@AuthenticationPrincipal String email) {
        Member findMember = memberService.findByEmail(email);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new MemberSimpleDto(findMember.getMemberId(), findMember.getEmail(), findMember.getNickname(), findMember.getPicture()));
    }
}
