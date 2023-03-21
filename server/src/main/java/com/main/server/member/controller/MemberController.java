package com.main.server.member.controller;

import com.main.server.follow.entity.Follow;
import com.main.server.member.dto.MemberSimpleDto;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import com.main.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.webjars.NotFoundException;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @GetMapping("/auth")
    public ResponseEntity getAuthMemberInfo(@AuthenticationPrincipal String email) {
        Member findMember = memberService.findByEmail(email);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new MemberSimpleDto(findMember.getMemberId(), findMember.getEmail(), findMember.getNickname(), findMember.getPicture()));
    }


    //팔로윙 확인 기능
    @GetMapping("/{memberId}/followings")
    public ResponseEntity<?> getFollowings(@PathVariable("memberId") @Positive Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException("Member not found"));
        List<Member> followings = new ArrayList<>(member.getFollowings());
        return ResponseEntity.ok(followings);
    }

    //팔로워 확인 기능
    @GetMapping("/{memberId}/followers")
    public ResponseEntity<?> getFollowers(@PathVariable("memberId") @Positive Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException("Member not found"));
        List<Member> followers = new ArrayList<>(member.getFollowers());
        return ResponseEntity.ok(followers);
    }
}
