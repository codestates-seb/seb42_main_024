package com.main.server.member.controller;

import com.main.server.member.dto.MemberAuthDto;
import com.main.server.member.dto.MemberSimpleDto;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import com.main.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/auth")
    public ResponseEntity getAuthMemberInfo(@AuthenticationPrincipal String email) {
        Member findMember = memberService.findByEmail(email);

        return ResponseEntity.status(HttpStatus.OK)
                .body(MemberAuthDto.createByMember(findMember));
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMemberId(@PathVariable("member-id") @Positive Long memberId) {
        Member findMember = memberService.findById(memberId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(MemberSimpleDto.createByMember(findMember));
    }
}
