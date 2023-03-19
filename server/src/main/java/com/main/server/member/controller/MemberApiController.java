package com.main.server.member.controller;

import com.main.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
public class MemberApiController {

    private final MemberRepository memberRepository;


    @PostMapping("/members")
    public Long save() {
        return null;
    }

}
