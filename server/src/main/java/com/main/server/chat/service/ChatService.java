package com.main.server.chat.service;

import com.main.server.chat.dto.ChatRequestDto;
import com.main.server.chat.dto.ChatResponseDto;
import com.main.server.chat.entity.Chat;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.repository.ChatRepository;
import com.main.server.chat.repository.ChatroomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final ChatroomService chatroomService;
    private final SimpMessagingTemplate template; // 알아볼것
    private final ChatRepository chatRepository;


    public void enterUser(ChatRequestDto dto) {
        Chatroom room = chatroomService.findVerifiedRoomId(dto.getChatroomId());

        if (!room.getUsers().contains(dto.getMemberName())) {
            room.getUsers().add(dto.getMemberName());
            dto.setMessage("< " + dto.getMemberName() + " > 님이 입장하셨습니다.");
        }

        template.convertAndSend("/sub/chat/room/" + dto.getChatroomId(), dto);
    }

    public void sendMessage(ChatRequestDto dto) {
        template.convertAndSend("/sub/chat/room/" + dto.getChatroomId(), dto);

        Chat chat = Chat.builder()
                .member(null)
                .chatroom(chatroomService.findVerifiedRoomId(dto.getChatroomId()))
                .content(dto.getMessage())
                .build();

        chatRepository.save(chat);
    }

    public void leaveUser(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String memberName = (String)headerAccessor.getSessionAttributes().get("MemberName");
        Long chatroomId = (Long)headerAccessor.getSessionAttributes().get("roomId");

        log.info("{}", memberName);
        log.info("{}", chatroomId.toString());

        Chatroom chatroom = chatroomService.findVerifiedRoomId(chatroomId);
        chatroom.getUsers().remove(memberName);

        log.info("headAccessor: {}", headerAccessor);

        String message = "< " + memberName + " > 님이 퇴장하셨습니다.";

        ChatResponseDto dto = ChatResponseDto.builder()
                .memberName(memberName)
                .chatroomId(chatroomId)
                .type(ChatResponseDto.MessageType.LEAVE)
                .message(message)
                .build();

        template.convertAndSend("/sub/chat/room/" + chatroomId, dto);
    }
}
