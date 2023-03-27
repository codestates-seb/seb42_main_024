package com.main.server.chat.service;

import com.main.server.chat.repository.ChatroomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@EnableScheduling
@RequiredArgsConstructor
@Transactional
public class ChatroomRankScheduler {

    private final ChatroomRepository chatroomRepository;

//    @Scheduled(cron = "0 0 0 * * *")
//    public void scheduler() {
//        log.info("jwt refresh token clear");
//
//
//    }
}
