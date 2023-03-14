package com.main.server.member.entity;


import com.main.server.audit.Auditable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Entity
@Getter
@NoArgsConstructor
 // 주석 = 바꿔야 할 부분
public class Member extends Auditable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 100, nullable = false, unique = true)
    private String nickname;
    // length

    @Column(length = 100, nullable = false, unique = true)
    private String email;
    // length

    @Column(length = 1000, nullable = false)
    private String password;
    // length



    @Builder
    public Member(String nickname, String email, String password) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }


}
