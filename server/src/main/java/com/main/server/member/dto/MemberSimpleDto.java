package com.main.server.member.dto;

import com.main.server.member.entity.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberSimpleDto {

    private String nickname;

    private String picture;

    public static MemberSimpleDto createByMember(Member member) {
        return new MemberSimpleDto(member.getNickname(), member.getPicture());
    }
}
