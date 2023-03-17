package com.main.server.chat.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.server.chat.dto.ChatroomPostDto;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.repository.ChatroomRepository;
import com.main.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatroomService {

    private final ObjectMapper objectMapper;
//    private Map<String, Chatroom> chatroomMap = new HashMap<>();
    private final ChatroomRepository chatroomRepository;
    private final MemberService memberService;

    public Chatroom createRoom(ChatroomPostDto dto, String email) {
        Chatroom chatroom = Chatroom.builder()
                .member(memberService.findByEmail(email))
                .title(dto.getTitle())
                .build();

        return chatroomRepository.save(chatroom);
    }

    public Chatroom findVerifiedRoomId(Long chatroomId) {
        Chatroom chatroom = chatroomRepository.findById(chatroomId)
                .get();

        return chatroom;
    }

    public Chatroom save(Chatroom chatroom) {
        return chatroomRepository.save(chatroom);
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
