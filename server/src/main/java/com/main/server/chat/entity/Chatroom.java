package com.main.server.chat.entity;

import com.main.server.chat.dto.ChatMessageDto;
import com.main.server.chat.service.ChatroomService;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

//@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Slf4j
public class Chatroom {

    private String memberName;

    private String chatroomId;

    private String title;

    private Integer maxCount;

    List<String> users = new ArrayList<>();

    @Builder
    public Chatroom(String memberName, String chatroomId, String title, Integer macCount) {
        this.memberName = memberName;
        this.chatroomId = chatroomId;
        this.title = title;
        this.maxCount = macCount;
    }

    @Transactional
    public void handlerActions(WebSocketSession session,
                               ChatMessageDto chatMessageDto,
                               ChatroomService chatRoomService) {
        log.info("@ @ @ @ @ handlerActions @ @ @ @ @");
    }

    @Transactional
    public <T> void sendMessage(T message, ChatroomService chatRoomService) {
        log.info("@ @ @ @ @ sendMessage @ @ @ @ @");
        Set<WebSocketSession> sessions = new HashSet<>();
        sessions.parallelStream()
                .forEach(session -> chatRoomService.sendMessage(session, message));
    }
}
