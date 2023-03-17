package com.main.server.like.dto;

import com.main.server.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter@Setter
public class LikeResponseDto {

    private long memberId;
    private long boardId;
    private long likeId;

    public void setMember(Member member) {
        this.memberId = member.getMemberId();
    }
}


