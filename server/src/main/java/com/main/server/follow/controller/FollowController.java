package com.main.server.follow.controller;

import com.main.server.follow.entity.Follow;
import com.main.server.follow.service.FollowService;
import com.main.server.global.dto.ResponseDto;
import com.main.server.member.entity.Member;
import com.main.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("/follows")
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

//    @GetMapping("/target/{follower-id}")
//    public ResponseEntity<List<Member>> getTargets(@PathVariable("follower-id") @Positive Long id) {
//        List<Member> targets = followService.getTargets(id);
//        return ResponseEntity.ok(targets);

            //가장 최근코드
    //이건 내가 팔로우 하고 있는 유저들을 보여준다.
        @GetMapping("/target/{follower-id}")
        public ResponseEntity<List<Long>> getTargets(@PathVariable("follower-id") @Positive Long id) {
            List<Long> targets = followService.getTargets(id);
            return ResponseEntity.ok(targets);
        }
    // 이건 나를 팔로우 하고 있는 유저들을 보여준다.
    @GetMapping("/follower/{target-id}")
    public ResponseEntity<List<Long>> getFollowers(@PathVariable("target-id") @Positive Long id) {
        List<Long> followers = followService.getFollowers(id);
        return ResponseEntity.ok(followers);
    }


    }

//    @GetMapping("/latest")
//    public ResponseEntity getFollower(@Positive @RequestParam int page,
//                                       @Positive @RequestParam int size){
//        Page<Follow> followPage = followService.findFollowers(page-1,size);
//        List<Follow> follows = followPage.getContent();
//
//        return ResponseEntity.status(HttpStatus.OK).body(follows);
////        return ResponseEntity.status(HttpStatus.CREATED).body();
//    }


/* 예를들어 맴버 A와 B가 있다.
* 맴버A가 로그인을 한다.
* 로그인 중인 맴버A가 다른 맴버B를 팔로우 하면 맴버B에게 A가 저장된다.
* */

