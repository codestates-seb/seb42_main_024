package com.main.server.follow.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class FollowResponseDto {
    private Long memberId;

    public FollowResponseDto(Long memberId) {
        this.memberId = memberId;
    }
}
