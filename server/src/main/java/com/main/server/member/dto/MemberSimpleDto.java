package com.main.server.member.dto;

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
}
