package com.main.server.chat.entity;

import com.main.server.chat.dto.ChatRequestDto;
import com.main.server.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "chatroom_id")
    private Chatroom chatroom;

    private String content;

    @Builder
    protected Chat(Member member,
                 Chatroom chatroom,
                 String content) {
        this.member = member;
        this.chatroom = chatroom;
        this.content = content;
    }
}
