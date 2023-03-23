package com.main.server.chat.controller;

import com.main.server.chat.dto.ChatroomCreateDto;
import com.main.server.chat.dto.ChatroomResponseDto;
import com.main.server.chat.dto.ChatSongRequestDto;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.service.ChatService;
import com.main.server.chat.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/rooms")
public class ChatroomController {

    private final ChatroomService chatRoomService;
    private final ChatService chatService;

    @PostMapping
    public ResponseEntity createRoom(@RequestBody @Valid ChatroomCreateDto dto, @AuthenticationPrincipal String email) {

        Chatroom chatroom = chatRoomService.createRoom(dto, "admin@google.com", dto.getPlaylistId());

        return ResponseEntity.status(HttpStatus.OK)
                .body(ChatroomResponseDto.byEntity(chatroom));
    }

    @GetMapping("/{chatroom-id}/songs")
    public ResponseEntity getSong(@PathVariable("chatroom-id") Long chatroomId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(chatRoomService.getSongAtRoom(chatroomId));
    }

    @PostMapping("/{chatroom-id}/songs/next")
    public ResponseEntity switchNextSong(@PathVariable("chatroom-id") Long chatroomId,
                                      @RequestBody ChatSongRequestDto key,
                                      @AuthenticationPrincipal String email) {
        if (chatRoomService.switchNextSong(chatroomId, key)) {
            chatService.sendSystemMessage(chatroomId, "NestSong");
        }

        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
}
