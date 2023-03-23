package com.main.server.follow.dto;

import com.main.server.member.dto.MemberSimpleDto;
import com.main.server.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class FollowResponseDto {
    private Long memberId;

    private String email;

    private String nickname;

    private String picture;

    public FollowResponseDto(Long memberId, String email, String nickname, String picture) {
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.picture = picture;
    }
}

