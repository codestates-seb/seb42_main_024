package com.main.server.follow.controller;

import com.main.server.follow.dto.FollowResponseDto;
import com.main.server.follow.entity.Follow;
import com.main.server.follow.service.FollowService;
import com.main.server.global.dto.ResponseDto;
import com.main.server.member.entity.Member;
import com.main.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

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
        Member member = memberService.findByEmail(email);
        followService.addFollow(id,member);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(id, 200));
    }

            //가장 최근코드
    //이건 내가 팔로우 하고 있는 유저들을 보여준다.
//    @GetMapping("/target/{follower-id}")
//    public ResponseEntity<List<FollowResponseDto>> getTargets(@PathVariable("follower-id") @Positive Long id) {
//        List<FollowResponseDto> targets = followService.getTargets(id);
//        return ResponseEntity.ok(targets);
//    }

    @GetMapping("/target/{follower-id}")
    public ResponseEntity<Page<FollowResponseDto>> getTargets(
            @PathVariable("follower-id") @Positive Long id,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page-1, size);
        Page<FollowResponseDto> targets = followService.getTargets(id, pageable);
        return ResponseEntity.ok(targets);
    }

    // 이건 나를 팔로우 하고 있는 유저들을 보여준다. dto 적용
    @GetMapping("/followers/{target-id}")
    public ResponseEntity<Page<FollowResponseDto>> getFollowers(
            @PathVariable("target-id") @Positive Long id,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page-1, size);
        Page<FollowResponseDto> followers = followService.getFollowers(id, pageable);
    return ResponseEntity.ok(followers);
}

}
/* 예를들어 맴버 A와 B가 있다.
* 맴버A가 로그인을 한다.
* 로그인 중인 맴버A가 다른 맴버B를 팔로우 하면 맴버B에게 A가 저장된다.
* */

/*1. 페이지 네이션해라
2. 페이지 네이션 처리한걸로 팔로우 리스트를 가져와라

3. 스트림 맵(Map) 함수 써서 타겟(멤버)만 가져와서 리스트로 만듬
4. 스트림 맵 함수 써서 맴버리스트를 맴버simpledto 리스트로 바꿔줌*/

/*쉬운 수정본

1. Repository에 쿼리를 입힌다 그래서 target에 물린 memberId만 쏙 빼온다.
2. 리스트로 변환해서 롱값으로 맴버아이디 가져간다.*/