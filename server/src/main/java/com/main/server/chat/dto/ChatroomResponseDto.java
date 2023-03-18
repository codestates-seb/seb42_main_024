package com.main.server.chat.dto;

import com.main.server.chat.entity.Chatroom;
import lombok.*;

@Data
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatroomResponseDto {

    private Long chatroomId;

    private String title;

    private String Owner;

    private Integer memberCount;

    public static ChatroomResponseDto byEntity(Chatroom chatroom) {
        return new ChatroomResponseDto(
                chatroom.getChatroomId(),
                chatroom.getTitle(),
                chatroom.getMember().getNickname(),
                chatroom.getMembers().size());
    }
}
