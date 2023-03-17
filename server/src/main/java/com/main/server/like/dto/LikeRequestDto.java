package com.main.server.like.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikeRequestDto {

    private long memberId;
    private long boardId;

    public LikeRequestDto(long memberId, long boardId) {
        this.memberId = memberId;
        this.boardId = boardId;
    }
}
