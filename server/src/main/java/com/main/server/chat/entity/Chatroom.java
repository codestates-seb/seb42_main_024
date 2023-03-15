package com.main.server.chat.entity;

import com.main.server.member.entity.Member;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Slf4j
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chatroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatroomId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String title;

    private Integer maxCount = 4;

    @CollectionTable(name = "user_list",
            joinColumns = @JoinColumn(name = "room_id"))
    @ElementCollection(fetch = FetchType.LAZY)
    List<String> users = new ArrayList<>();

    @Builder
    public Chatroom(Member member, String title) {
        this.member = member;
        this.title = title;
    }

    //    @Transactional
//    public void handlerActions(WebSocketSession session,
//                               ChatMessageDto chatMessageDto,
//                               ChatroomService chatRoomService) {
//        log.info("@ @ @ @ @ handlerActions @ @ @ @ @");
//    }
//
//    @Transactional
//    public <T> void sendMessage(T message, ChatroomService chatRoomService) {
//        log.info("@ @ @ @ @ sendMessage @ @ @ @ @");
//        Set<WebSocketSession> sessions = new HashSet<>();
//        sessions.parallelStream()
//                .forEach(session -> chatRoomService.sendMessage(session, message));
//    }
}
