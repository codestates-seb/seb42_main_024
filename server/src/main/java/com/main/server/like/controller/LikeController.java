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
        Member member = memberService.findByEmail("admin@google.com");
        likeService.addLike(id,member);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(id, 200));

    }

    // Controller
    @DeleteMapping("down/{board-id}")
    public ResponseEntity deleteLike(@PathVariable("board-id") @Positive Long id,
                                     @AuthenticationPrincipal String email) {
        Member member = memberService.findByEmail("admin@google.com"); //이메일은 임시로 넣음
        likeService.deleteLike(id, member);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(id, 200));
    }



}
