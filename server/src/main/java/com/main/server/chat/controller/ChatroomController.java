package com.main.server.chat.controller;

import com.main.server.chat.data.ChatSong;
import com.main.server.chat.dto.ChatroomCreateDto;
import com.main.server.chat.dto.ChatroomResponseDto;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.service.ChatService;
import com.main.server.chat.service.ChatroomService;
import com.main.server.member.entity.Member;
import com.main.server.member.service.MemberService;
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
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity createRoom(@RequestBody @Valid ChatroomCreateDto dto, @AuthenticationPrincipal String email) {
        Member member = memberService.findByEmail("admin@google.com");
        Chatroom chatroom = chatRoomService.createRoom(dto, member);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ChatroomResponseDto.byEntity(chatroom));
    }

    @GetMapping("/{chatroom-id}/songs")
    public ResponseEntity getSong(@PathVariable("chatroom-id") Long chatroomId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(chatRoomService.getSongAtRoom(chatroomId));
    }

    @PostMapping("/{chatroom-id}/songs")
    public ResponseEntity addSong(@PathVariable("chatroom-id") Long chatroomId,
                                  @RequestBody ChatSong chatSong,
                                  @AuthenticationPrincipal String email) {
        chatRoomService.addSongToRoom(chatroomId, chatSong);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/{chatroom-id}/songs/next")
    public ResponseEntity switchNextSong(@PathVariable("chatroom-id") Long chatroomId,
                                         @RequestBody ChatSong chatSong,
                                         @AuthenticationPrincipal String email) {

        chatRoomService.switchNextSong(chatroomId, chatSong);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
}
