package com.main.server.member.dto;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
public class MemberPostDto {

    @NotBlank
    @Length(max = 100, message = "잘못된 이메일 형식입니다")
    @Email
    private String email;
    // length

    @NotBlank
    @Pattern(regexp = "^[가-힣a-zA-Z]*$", message = "멤버 네임은 한글과 영문만 가능합니다(대문자 가능)")
    private String name;
    //정규식 수정 가능

    @NotBlank
    @Pattern(regexp = "^[가-힣a-z]*$", message = "비밀번호는 한글과 영문만 가능합니다")
    @Length(min = 8, max = 16, message = "비밀번호는 8자 이상 16자 이하의 길이이여야 합니다")
    private String pwd;

    private String content;
}
