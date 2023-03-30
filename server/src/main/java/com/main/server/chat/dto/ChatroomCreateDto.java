package com.main.server.chat.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class ChatroomCreateDto {

    @NotNull(message = "제목을 넣어주세요.")
    @Size(min = 3, max = 50 ,message = "제목의 길이는 3이상 50이하여야 합니다.")
    private String title;

    @NotNull(message = "플레이리스트는 하나이상 포함되어야 합니다.")
    private Long playlistId;

//    private boolean secret;
//
//    private String pwd;
}
