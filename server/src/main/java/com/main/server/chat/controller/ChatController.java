package com.main.server.chat.controller;

import com.main.server.chat.dto.ChatMessageDto;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.service.ChatService;
import com.main.server.chat.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
//@Transactional
public class ChatController {

    private final ChatroomService chatroomService;
    private final ChatService chatService;

    @MessageMapping("/chat/join")
    public void enterUser(@Payload ChatMessageDto dto,
                          SimpMessageHeaderAccessor headerAccessor) { // 알아볼것

        chatService.enterUser(dto);
        headerAccessor.getSessionAttributes().put("MemberName", dto.getMemberName());
        headerAccessor.getSessionAttributes().put("roomId", dto.getChatroomId());

        log.info("CHAT6 {}", headerAccessor.getSessionAttributes());
    }

    @MessageMapping("/chat/message/{chatroomId}")
    public void sendMessage(@Payload ChatMessageDto dto,
                            @PathVariable String chatroomId) {
        log.info("Chat2 {}", dto.getMessage());
        log.info("Chat3 {}", chatroomId);
        log.info("Chat5 {}", dto.getChatroomId());

        chatService.sendMessage(dto);
    }

}
