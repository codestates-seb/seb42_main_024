package com.main.server.chat.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {

//    private Long chatMessageId;

//    private MessageType type = MessageType.TALK;

    private String message;

    private String memberName;

    private String chatroomId;

//    public void newConnect() {
//        this.type = MessageType.ENTER;
//    }
//
//    public void closeConnect() {
//        this.type = MessageType.LEAVE;
//    }

//    public enum MessageType {
//        ENTER, TALK, LEAVE;
//    }
}
