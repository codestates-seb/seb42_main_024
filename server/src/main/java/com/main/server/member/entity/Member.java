package com.main.server.member.entity;


import com.main.server.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 100, nullable = false, unique = true)
    private String nickname;

    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @Column(length = 500)
    private String picture;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> roles = new ArrayList<>();


    @Builder
    public Member( String nickname,
                   String email,
                   String picture,
                   List<String> roles) {
        this.nickname = nickname;
        this.email = email;
        this.picture = picture;
        this.roles = roles;
    }
}
