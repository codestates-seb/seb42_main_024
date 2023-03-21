package com.main.server.like.controller;

import com.main.server.global.dto.ResponseDto;
import com.main.server.like.service.LikeService;
import com.main.server.member.entity.Member;
import com.main.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Email;
import javax.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/like")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;
    private final MemberService memberService;


    @PostMapping("up/{board-id}")
    public ResponseEntity addLike(@PathVariable("board-id")@Positive Long id,
                                  @AuthenticationPrincipal String email ) {
        Member member = memberService.findByEmail(email);
        likeService.addLike(id,member,-1);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(id, 200));

    }
}
