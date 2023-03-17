package com.main.server.member.dto;

import com.main.server.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberRequestDto {
        private String email;
        private String nickname;
        private String password;

/*        public Member toEntity() {
            return Member.builder()
                    .email(email)
                    .nickname(nickname)
                    .password(password)
                    .build();
                            }
 */
}
