package com.main.server.chat.repository;

import com.main.server.chat.entity.Chatroom;

import java.util.List;

public interface ChatroomRepositoryCustom {

    List<Chatroom> getChatroomsAfterId(Long chatroomId);
}
