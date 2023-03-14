package com.main.server.chat.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.server.chat.dto.ChatMessageDto;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
//@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {
//
//    private final ObjectMapper objectMapper;
//    private final HashMap<String, WebSocketSession> sessionMap = new HashMap<>();
//    private final ChatroomService chatroomService;
//
//    @Override
//    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//        super.afterConnectionEstablished(session);
//        sessionMap.put(session.getId(), session);
//        log.info("소켓 시작 {}", session.getId());
//    }
//
//    @Override
//    public void handleTextMessage(WebSocketSession session,
//                                  TextMessage message) throws JsonProcessingException {
//        String payload = message.getPayload();
//        log.info("{}", payload);
//
//        ChatMessageDto dto = objectMapper.readValue(payload, ChatMessageDto.class);
//        log.info("session {}", dto.toString());
//
//        for (String key : sessionMap.keySet()) {
//            WebSocketSession ws = sessionMap.get(key);
//            try {
//                ws.sendMessage(new TextMessage(payload));
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//    }
//
//    @Override
//    public void afterConnectionClosed(WebSocketSession session,
//                                      CloseStatus status) throws Exception {
//        sessionMap.remove(session.getId());
//        super.afterConnectionClosed(session, status);
//        log.info("소켓 종료 {}", session.getId());
//    }
}
