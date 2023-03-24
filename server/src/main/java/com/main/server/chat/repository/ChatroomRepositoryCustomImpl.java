package com.main.server.chat.repository;

import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.entity.QChatroom;
import com.main.server.global.config.PropertyVariable;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ChatroomRepositoryCustomImpl implements ChatroomRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public List<Chatroom> getChatroomsAfterId(Long chatroomId) {
        QChatroom chatroom = QChatroom.chatroom;

        List<Chatroom> result = jpaQueryFactory
                .selectFrom(chatroom)
                .where(getLtChatroomId(chatroomId, chatroom))
                .limit(PropertyVariable.FIND_CHATROOM_MAX)
                .orderBy(chatroom.chatroomId.desc())
                .fetch();

        return result;
    }

    private static BooleanExpression getLtChatroomId(Long chatroomId, QChatroom chatroom) {
        if (chatroomId == 0) return null;
        return chatroom.chatroomId.lt(chatroomId);
    }
}
