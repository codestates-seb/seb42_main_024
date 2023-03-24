package com.main.server.chat.dto;

import com.main.server.chat.entity.Chatroom;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatroomSimpleDto {

    private Long chatroomId;

    private String title;

    private String Owner;

    private Integer memberCount;

    public static ChatroomSimpleDto createByChatroom(Chatroom chatroom) {
        return new ChatroomSimpleDto(
                chatroom.getChatroomId(),
                chatroom.getTitle(),
                chatroom.getMember().getNickname(),
                chatroom.getMembers().size());
    }
}
