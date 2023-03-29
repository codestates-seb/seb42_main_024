package com.main.server.chat.entity;

import com.main.server.audit.Auditable;
import com.main.server.chat.dto.ChatRequestDto;
import com.main.server.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chat extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long chatroomId;

    @Column(nullable = false, length = 100)
    private String content;

    @Builder
    protected Chat(Long memberId,
                 Chatroom chatroom,
                 String content) {
        this.memberId = memberId;
        this.chatroomId = chatroom.getChatroomId();
        this.content = content;
    }
}
