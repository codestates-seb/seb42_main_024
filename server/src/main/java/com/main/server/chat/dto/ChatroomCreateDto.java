package com.main.server.chat.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ChatroomCreateDto {

    @NotNull(message = "타이틀은 빈값이 아니여야 합니다.")
    private String title;

    private Long playlistId;

//    private boolean secret;
//
//    private String pwd;
}
