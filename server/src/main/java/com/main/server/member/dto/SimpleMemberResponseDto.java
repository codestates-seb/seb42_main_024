package com.main.server.member.dto;



import com.main.server.member.entity.Role;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SimpleMemberResponseDto {

    private Long memberId;

    private String email;

    private String name;

    private Integer follow;


    private Role role;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private String content;
}

