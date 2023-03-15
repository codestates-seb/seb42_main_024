package com.main.server.chat.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.server.chat.dto.ChatroomPostDto;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.repository.ChatroomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatroomService {

    private final ObjectMapper objectMapper;
//    private Map<String, Chatroom> chatroomMap = new HashMap<>();
    private final ChatroomRepository chatroomRepository;

    public Chatroom createRoom(ChatroomPostDto dto) {
        Chatroom chatroom = Chatroom.builder()
                .member(null)
                .title(dto.getTitle())
                .build();

        return chatroomRepository.save(chatroom);
    }

    public Chatroom findVerifiedRoomId(Long chatroomId) {
        Chatroom chatroom = chatroomRepository.findById(chatroomId)
                .get();

        return chatroom;
    }

//    public <T> void sendMessage(WebSocketSession session, T message) {
//        log.info("sendMessage is used");
//        try {
//            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
//        } catch (IOException e) {
//            log.error(e.getMessage(), e);
//        }
//    }
}
