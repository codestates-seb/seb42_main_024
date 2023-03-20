package com.main.server.chat.controller;

import com.main.server.chat.dto.ChatRequestDto;
import com.main.server.chat.dto.ChatResponseDto;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.service.ChatService;
import com.main.server.chat.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat/join")
    public void enterUser(@Payload ChatRequestDto dto,
                          SimpMessageHeaderAccessor headerAccessor) { // 알아볼것

        chatService.enterUser(dto);
        headerAccessor.getSessionAttributes().put("MemberName", dto.getMemberName());
        headerAccessor.getSessionAttributes().put("roomId", dto.getChatroomId());

        log.info("session: {}", headerAccessor.getSessionAttributes());
    }

    @MessageMapping("/chat/message")
    public void sendMessage(@Payload ChatRequestDto dto) {
        log.info("message: {}", dto.getMessage());
        log.info("chatroomId: {}", dto.getChatroomId());

        chatService.sendMessage(dto);
    }

    @EventListener
    public void webSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("Disconnect event: {}", event);

        chatService.leaveUser(event);
    }
}
