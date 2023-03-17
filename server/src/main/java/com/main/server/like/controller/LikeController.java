package com.main.server.like.controller;

import com.main.server.like.dto.LikeRequestDto;
import com.main.server.like.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/like")
public class LikeController {

    private final LikeService likeService;

    //좋아요 추가
    @PostMapping
    public ResponseEntity<Void> addLike(@RequestBody LikeRequestDto likeRequestDto) {
        try {
            likeService.add(likeRequestDto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    //좋아요 삭제
    @DeleteMapping
    public ResponseEntity<Void> removeLike(@RequestBody LikeRequestDto likeRequestDto) {
        likeService.remove(likeRequestDto);
        return ResponseEntity.ok().build();
    }


}
