package com.main.server.chat.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequestDto {

    private String message;

    private MessageType type;

    private String memberName;

    private Long chatroomId;

//    public void newConnect() {
//        this.type = MessageType.ENTER;
//    }
//
//    public void closeConnect() {
//        this.type = MessageType.LEAVE;
//    }

    public enum MessageType {
        ENTER, TALK, LEAVE;
    }
//    public void closeConnect() {
//        this.type = MessageType.LEAVE;
//    }


}
