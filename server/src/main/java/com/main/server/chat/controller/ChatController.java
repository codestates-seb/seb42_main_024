package com.main.server.chat.controller;

import com.main.server.chat.dto.ChatRequestDto;
import com.main.server.chat.service.ChatService;
import com.main.server.chat.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

import static com.main.server.chat.dto.ChatRequestDto.MessageType.LEAVE;

@RestController
@RequiredArgsConstructor
@Slf4j
//@Transactional
public class ChatController {

    private final ChatroomService chatroomService;
    private final ChatService chatService;

//    채팅참여
    @MessageMapping("/chat/join")
    public void enterUser(@Payload ChatRequestDto dto,
                          SimpMessageHeaderAccessor headerAccessor) { // 알아볼것

        chatService.enterUser(dto);
        headerAccessor.getSessionAttributes().put("MemberName", dto.getMemberName());
        headerAccessor.getSessionAttributes().put("roomId", dto.getChatroomId());

        log.info("CHAT6 {}", headerAccessor.getSessionAttributes());
        System.out.println("참여확인");
    }

//    채팅기능
    @MessageMapping("/chat/message")
    public void sendMessage(@Payload ChatRequestDto dto) {
        log.info("방번호 :", dto.getChatroomId());
        log.info("이름 :", dto.getMemberName());
        log.info("메세지 :", dto.getMessage());
        System.out.println("메세지 전송확인");

        chatService.sendMessage(dto);
    }

//    채팅나가기

    @MessageMapping("/chat/leave")
    public void leaveRoom(@Payload ChatRequestDto dto,SimpMessageHeaderAccessor headerAccessor)  {

        chatService.leaveRoom(dto);
            headerAccessor.getSessionAttributes().put("MemberName", dto.getMemberName());
            headerAccessor.getSessionAttributes().put("roomId", dto.getChatroomId());

            log.info("CHAT7 {}", headerAccessor.getSessionAttributes());
    }
}
