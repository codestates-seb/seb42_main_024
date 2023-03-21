package com.main.server.member.dto;

import com.main.server.follow.entity.Follow;
import com.main.server.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class MemberDto {



    //Follow 기능 추가
    private List<Member> followings;
    private List<Member> followers;

    public MemberDto(Member member) {
        // 여기에 member 코드 완성 시키면 됨.


        //팔로우 기능 추가.
        this.followings = new ArrayList<>(member.getFollowings());
        this.followers = new ArrayList<>(member.getFollowers());
    }
}
