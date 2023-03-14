package com.main.server.chat.service;

import com.main.server.chat.dto.ChatMessageDto;
import com.main.server.chat.entity.Chatroom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final ChatroomService chatroomService;
    private final SimpMessagingTemplate template; // 알아볼것

    public void enterUser(ChatMessageDto dto) {
        Chatroom room = chatroomService.findVerifiedRoomId(dto.getChatroomId());

        if (!room.getUsers().contains(dto.getMemberName())) {
            room.getUsers().add(dto.getMemberName());
            dto.setMessage("< " + dto.getMemberName() + " > 님이 입장하셨습니다.");
        }

        template.convertAndSend("/sub/chat/room/" + dto.getChatroomId(), dto);
    }

    public void sendMessage(ChatMessageDto dto) {
        template.convertAndSend("/sub/chat/room/" + dto.getChatroomId(), dto);
    }
}
