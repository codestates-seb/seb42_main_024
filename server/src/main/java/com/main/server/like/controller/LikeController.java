package com.main.server.like.controller;

import com.main.server.board.entity.Board;
import com.main.server.global.dto.ResponseDto;
import com.main.server.like.service.LikeService;
import com.main.server.member.entity.Member;
import com.main.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
        //이메일을 불러옴 지금 정상작동안해서 임의로 값 넣음
        Member member = memberService.findByEmail("admin@google.com");
        //id 랑 멤버 추가해 버림
        likeService.addLike(id,member);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(id, 200));

    }


}
