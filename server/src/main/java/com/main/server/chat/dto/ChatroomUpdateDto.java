package com.main.server.chat.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class ChatroomUpdateDto {

    @NotNull(message = "타이틀은 빈값이 아니여야 합니다.")
    @Size(min = 3, max = 50 ,message = "제목의 길이는 3이상 50이하여야 합니다.")
    @Pattern(regexp = "^[ㄱ-ㅎ|ㅏ-ㅣ|가-핳|a-z|A-Z|0-9]+$", message = "한글, 숫자, 알파벳만 사용 가능합니다.")
    private String title;
}
