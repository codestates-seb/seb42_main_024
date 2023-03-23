package com.main.server.member.controller;

import com.main.server.follow.entity.Follow;
import com.main.server.global.dto.ResponseDto;
import com.main.server.member.dto.MemberSimpleDto;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import com.main.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @GetMapping("/auth")
    public ResponseEntity getAuthMemberInfo(@AuthenticationPrincipal String email) {
        Member findMember = memberService.findByEmail(email);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new MemberSimpleDto(findMember.getMemberId(), findMember.getEmail(), findMember.getNickname(), findMember.getPicture()));
    }



}
