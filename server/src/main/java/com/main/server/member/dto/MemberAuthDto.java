package com.main.server.member.dto;

import com.main.server.member.entity.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberAuthDto {

    private Long memberId;

    private String email;

    private String nickname;

    private String picture;

    //정척 팩토리 메서드
    public static MemberAuthDto createByMember(Member member) {
        return new MemberAuthDto(
                member.getMemberId(),
                member.getEmail(),
                member.getNickname(),
                member.getPicture()
        );
    }
}
