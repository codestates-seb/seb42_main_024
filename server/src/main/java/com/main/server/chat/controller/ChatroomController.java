package com.main.server.chat.controller;

import com.main.server.board.dto.BoardDto;
import com.main.server.chat.data.ChatSong;
import com.main.server.chat.dto.*;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.service.ChatroomService;
import com.main.server.dto.SingleResponseDto;
import com.main.server.global.dto.ResponseDto;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
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
import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity getChatroom(@PathVariable("chatroom-id") @Positive Long chatroomId) {
        ChatroomResponseDto responseDto = ChatroomResponseDto
                .createByChatroom(
                        chatroomService.findChatroomById(chatroomId));

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseDto(responseDto, 200));
    }

    @GetMapping
    public ResponseEntity getChatrooms(@RequestParam("id") Long id) {
        Long chatroomId = id != null ? Math.max(0, id) : 0;
        List<ChatroomSimpleDto> chatroomList = chatroomService.findChatrooms(chatroomId).stream()
                .map(ChatroomSimpleDto::createByChatroom)
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseDto(ChatroomListDto.of(chatroomList), 200));
    }

    @GetMapping("/rank")
    public ResponseEntity getHighRankChatroom() {
        List<ChatroomSimpleDto> chatroomList = chatroomService.getHighRankChatroomList().stream()
                .map(ChatroomSimpleDto::createByChatroom)
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseDto(chatroomList, 200));
    }

    @GetMapping("/{chatroom-id}/songs")
    public ResponseEntity getSong(@PathVariable("chatroom-id") @Positive Long chatroomId) {
        ChatSongResponseDto responseDto = chatroomService.getSongAtRoom(chatroomId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseDto(responseDto, 200));
    }

    @PatchMapping("/{chatroom-id}")
    public ResponseEntity updateChatroom(@PathVariable("chatroom-id") @Positive Long chatroomId,
                                         @RequestBody @Valid ChatroomUpdateDto dto,
                                         @AuthenticationPrincipal String email) {
        
        Chatroom findChatroom = chatroomService.findChatroomById(chatroomId);
        chatroomService.isChatroomOwnerEmail(findChatroom, email);
        chatroomService.updateChatroom(findChatroom, dto);
        ChatroomResponseDto responseDto = ChatroomResponseDto
                .createByChatroom(
                        chatroomService.findChatroomById(chatroomId));

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseDto(responseDto, 200));
    }

    @PostMapping("/{chatroom-id}/songs")
    public ResponseEntity addSong(@PathVariable("chatroom-id") @Positive Long chatroomId,
                                  @RequestBody ChatSong chatSong,
                                  @AuthenticationPrincipal String email) {
        // 방장만 노래 추가 가능
        Chatroom findChatroom = chatroomService.findChatroomById(chatroomId);
        chatroomService.isChatroomOwnerEmail(findChatroom, email);

        chatroomService.addSongToRoom(chatroomId, chatSong);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/{chatroom-id}/songs/next")
    public ResponseEntity switchNextSong(@PathVariable("chatroom-id") @Positive Long chatroomId,
                                         @RequestBody ChatSong chatSong,
                                         @AuthenticationPrincipal String email) {
        chatroomService.switchNextSong(chatroomId, chatSong);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{chatroom-id}")
    public ResponseEntity deleteChatroom(@PathVariable("chatroom-id") @Positive Long chatroomId,
                                     @AuthenticationPrincipal String email) {
        Chatroom findChatroom = chatroomService.findChatroomById(chatroomId);
        chatroomService.isChatroomOwnerEmail(findChatroom, email);
        chatroomService.deleteChatroom(findChatroom);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
