package com.main.server.chat.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequestDto {

    private String message;

    private String memberName;

    private Long chatroomId;
}
