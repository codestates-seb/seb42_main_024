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
@RequestMapping("/follow")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;
    private final MemberService memberService;

    @PostMapping("{member-id}")
    public ResponseEntity addLike(@PathVariable("member-id")@Positive Long id,
                                  @AuthenticationPrincipal String email ) {
        Member member = memberService.findByEmail("admin@google.com");
        followService.addFollow(id);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(id, 200));
    }

}

