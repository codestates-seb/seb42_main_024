package com.main.server.chat.controller;

import com.main.server.chat.dto.ChatroomPostDto;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/rooms")
public class ChatroomController {

    private final ChatroomService chatRoomService;

    @PostMapping
    public ResponseEntity createRoom(@RequestBody ChatroomPostDto dto) {

        Chatroom chatroom = chatRoomService.createRoom(dto);

        return ResponseEntity.status(HttpStatus.OK)
                .body(chatroom.getChatroomId());
    }

    @DeleteMapping("{chatroomId}")
    @ResponseBody
    public String deleteRoom(@PathVariable Long chatroomId) {

        chatRoomService.deleteChatRoom(chatroomId);
        return "방이 성공적으로 삭제 되었습니다.";
    }
}
