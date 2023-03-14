package com.main.server.chat.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.server.chat.dto.ChatroomPostDto;
import com.main.server.chat.entity.Chatroom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatroomService {

    private final ObjectMapper objectMapper;
    private Map<String, Chatroom> chatroomMap = new HashMap<>();

    private int num = 1;

    public Chatroom createRoom(ChatroomPostDto dto) {
        //String chatroomId = UUID.randomUUID().toString();
        String chatroomId = "chatroom" + num;
        num++;

        Chatroom chatroom = Chatroom.builder()
                .memberName(dto.getMemberName())
                .title(dto.getTitle())
                .chatroomId(chatroomId)
                .build();

        chatroomMap.put(chatroomId, chatroom);

        return chatroom;
    }

    public Chatroom findVerifiedRoomId(String chatroomId) {
        if (chatroomMap.containsKey(chatroomId)) {
            return chatroomMap.get(chatroomId);
        } else {
            log.info("no chatroomId");
            return null;
        }
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        log.info("sendMessage is used");
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}
