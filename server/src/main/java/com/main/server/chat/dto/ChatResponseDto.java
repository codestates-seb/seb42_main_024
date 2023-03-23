package com.main.server.chat.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatResponseDto {

    private String message;

    private ChatResponseDto.MessageType type = ChatResponseDto.MessageType.TALK;

    private String memberName;

    private Long chatroomId;

    private Integer memberNumber;


    @Builder
    public ChatResponseDto(String message,
                           String memberName,
                           Long chatroomId,
                           Integer memberNumber) {
        this.message = message;
        this.memberName = memberName;
        this.chatroomId = chatroomId;
        this.memberNumber = memberNumber;
    }

    public ChatResponseDto isEnterType() {
        this.type = MessageType.ENTER;
        return this;
    }

    public ChatResponseDto isLeaveType() {
        this.type = MessageType.LEAVE;
        return this;
    }

    public ChatResponseDto isErrorType(String message) {
        this.type = MessageType.ERROR;
        this.message = message;
        return this;
    }

    public ChatResponseDto isSystemType(String message) {
        this.type = MessageType.SYSTEM;
        this.message = message;
        return this;
    }

    public enum MessageType {
        ENTER, TALK, LEAVE, SYSTEM, ERROR;
    }
}
