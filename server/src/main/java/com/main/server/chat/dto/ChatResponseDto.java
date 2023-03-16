package com.main.server.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ChatResponseDto {

    private String message;

    private ChatResponseDto.MessageType type = ChatResponseDto.MessageType.TALK;

    private String memberName;

    private Long chatroomId;

    @Builder
    public ChatResponseDto(String message,
                           MessageType type,
                           String memberName,
                           Long chatroomId) {
        this.message = message;
        this.type = type;
        this.memberName = memberName;
        this.chatroomId = chatroomId;
    }

    public enum MessageType {
        ENTER, TALK, LEAVE;
    }
}
