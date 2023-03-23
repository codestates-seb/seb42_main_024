package com.main.server.follow.controller;

import com.main.server.follow.service.FollowService;
import com.main.server.global.dto.ResponseDto;
import com.main.server.member.entity.Member;
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
@RequestMapping("/api/follows")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;
    private final MemberService memberService;

    @PostMapping("{member-id}")
    public ResponseEntity postFollow(@PathVariable("member-id")@Positive Long id,
                                  @AuthenticationPrincipal String email ) {
        Member member = memberService.findByEmail("admin@google.com");
        followService.addFollow(id,member);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(id, 200));
    }
}

/* 예를들어 맴버 A와 B가 있다.
* 맴버A가 로그인을 한다.
* 로그인 중인 맴버A가 다른 맴버B를 팔로우 하면 맴버B에게 A가 저장된다.
* */

