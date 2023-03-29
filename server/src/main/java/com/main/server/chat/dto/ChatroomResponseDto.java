package com.main.server.chat.dto;

import com.main.server.chat.entity.Chatroom;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatroomResponseDto {

    private Long chatroomId;

    private String title;

    private String Owner;

    private String thumbnail;

    private Integer memberCount;

    private List<String> members;

    public static ChatroomResponseDto createByChatroom(Chatroom chatroom) {
        return new ChatroomResponseDto(
                chatroom.getChatroomId(),
                chatroom.getTitle(),
                chatroom.getMember().getNickname(),
                chatroom.getThumbnail(),
                chatroom.getMembers().size(),
                chatroom.getMembers());
    }
}
