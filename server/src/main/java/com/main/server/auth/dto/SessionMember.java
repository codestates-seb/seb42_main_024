package com.main.server.auth.dto;

import com.main.server.member.entity.Member;
import lombok.Data;

@Data
public class SessionMember {

    private String name;
    private String email;
    private String picture;

    public SessionMember(Member member) {
        this.name = member.getNickname();
        this.email = member.getEmail();
        this.picture = member.getPicture();
    }
}
