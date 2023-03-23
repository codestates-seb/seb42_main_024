package com.main.server.follow.controller;

import com.main.server.follow.service.FollowService;
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

    @PostMapping("/{followingId}")
    public ResponseEntity<?> follow(@PathVariable("followingId") @Positive Long followingId,
                                    @AuthenticationPrincipal Long followerId) {
        followService.follow(followerId, followingId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Followed successfully");
    }

    @DeleteMapping("/{followingId}")
    public ResponseEntity<?> unfollow(@PathVariable("followingId") @Positive Long followingId,
                                      @AuthenticationPrincipal Long followerId) {
        followService.unfollow(followerId, followingId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Unfollowed successfully");
    }
}

