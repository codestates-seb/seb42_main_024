package com.main.server.member.dto;

import com.main.server.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberSimpleDto {

    private Long memberId;

    private String email;

    private String nickname;

    private String picture;

    //정척 팩토리 메서드
    public static MemberSimpleDto createByEntity(Member member) {
        return new MemberSimpleDto(
                member.getMemberId(),
                member.getEmail(),
                member.getNickname(),
                member.getPicture()
        );
    }
}
