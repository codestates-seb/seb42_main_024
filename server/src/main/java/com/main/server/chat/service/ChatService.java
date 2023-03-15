package com.main.server.chat.service;

import com.main.server.chat.dto.ChatRequestDto;
import com.main.server.chat.entity.Chat;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.repository.ChatRepository;
import com.main.server.chat.repository.ChatroomRepository;
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
}
