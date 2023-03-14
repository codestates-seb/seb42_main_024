package com.main.server.member.dto;

import com.main.server.board.entity.Board;
import com.main.server.member.entity.Member;

import java.time.LocalDateTime;

public class MemberResponseDto {

    private final LocalDateTime createdDate;
    private final LocalDateTime modifiedDate;
    private long memberId;
    private String email;
    private String nickname;

    private String password;

    public MemberResponseDto(Member entity) {
        this.memberId = entity.getMemberId();
        this.nickname = entity.getNickname();
        this.email = entity.getEmail();
        this.createdDate = entity.getCreatedAt();
        this.modifiedDate = entity.getModifiedAt();
    }
}
