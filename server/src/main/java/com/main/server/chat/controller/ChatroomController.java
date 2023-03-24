package com.main.server.chat.controller;

import com.main.server.chat.data.ChatSong;
import com.main.server.chat.dto.ChatSongResponseDto;
import com.main.server.chat.dto.ChatroomCreateDto;
import com.main.server.chat.dto.ChatroomResponseDto;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.service.ChatroomService;
import com.main.server.global.dto.ResponseDto;
import com.main.server.member.entity.Member;
import com.main.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@Validated
@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class ChatroomController {

    private final ChatroomService chatroomService;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity createRoom(@RequestBody @Valid ChatroomCreateDto dto,
                                     @AuthenticationPrincipal String email) {
        System.out.println(email);
        Member member = memberService.findByEmail(email);
        ChatroomResponseDto responseDto = ChatroomResponseDto
                .createByChatroom(
                        chatroomService.createRoom(dto, member));

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseDto(responseDto, 200));
    }

    @GetMapping("/{chatroom-id}")
    public ResponseEntity getChatroom(@PathVariable("chatroom-id") Long chatroomId) {
        ChatroomResponseDto responseDto = ChatroomResponseDto
                .createByChatroom(
                        chatroomService.findChatroomById(chatroomId));

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseDto(responseDto, 200));
    }

    @GetMapping("/{chatroom-id}/songs")
    public ResponseEntity getSong(@PathVariable("chatroom-id") Long chatroomId) {
        ChatSongResponseDto responseDto = chatroomService.getSongAtRoom(chatroomId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseDto(responseDto, 200));
    }

    @PostMapping("/{chatroom-id}/songs")
    public ResponseEntity addSong(@PathVariable("chatroom-id") Long chatroomId,
                                  @RequestBody ChatSong chatSong,
                                  @AuthenticationPrincipal String email) {
        chatroomService.addSongToRoom(chatroomId, chatSong);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/{chatroom-id}/songs/next")
    public ResponseEntity switchNextSong(@PathVariable("chatroom-id") Long chatroomId,
                                         @RequestBody ChatSong chatSong,
                                         @AuthenticationPrincipal String email) {
        chatroomService.switchNextSong(chatroomId, chatSong);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
