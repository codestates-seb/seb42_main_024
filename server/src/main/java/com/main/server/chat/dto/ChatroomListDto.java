package com.main.server.chat.dto;

import com.main.server.global.config.PropertyVariable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatroomListDto {

    private List<ChatroomSimpleDto> chatroomList;

    private Long next;

    public static ChatroomListDto of(List<ChatroomSimpleDto> list) {
        Long chatroomId = list.size() > 0 ? list.get(list.size() - 1).getChatroomId() : null;
        return new ChatroomListDto(list, chatroomId);
    }
}
