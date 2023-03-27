package com.main.server.chat.service;

import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.repository.ChatroomRepository;
import com.main.server.global.config.PropertyVariable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
@EnableScheduling
@RequiredArgsConstructor
@Transactional
public class ChatroomRankScheduler {

    private final ChatroomService chatroomService;
    private final ChatroomRepository chatroomRepository;

//    @Scheduled(cron = "0 0 0 * * *")
    @Scheduled(cron = "0 0 0/1 * * *")
    public void scheduler() {
        log.info("delete&rank");

        Integer deleteCount = Math.min(10,
                Math.max(0, (int)chatroomRepository.count() - PropertyVariable.FIND_CHATROOM_MAX));

        if (deleteCount > 0) {
            List<Chatroom> rowRankingChatrooms = chatroomRepository.getLowRankingChatrooms(deleteCount)
                    .stream()
                    .filter(chatroom -> chatroom.getMembers().size() == 0)
                    .collect(Collectors.toList());

            chatroomRepository.deleteAll(rowRankingChatrooms);
        }

        List<Chatroom> highRankingChatrooms = chatroomRepository.getHighRankingChatrooms();
        chatroomService.newRanking(highRankingChatrooms);
    }
}
