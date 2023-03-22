package com.main.server.chat.service;

import com.main.server.chat.data.ChatSongQueue;
import com.main.server.chat.data.ChatSong;
import com.main.server.chat.dto.ChatSongResponseDto;
import com.main.server.chat.dto.ChatroomCreateDto;
import com.main.server.chat.dto.ChatSongRequestDto;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.repository.ChatroomRepository;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.service.MemberService;
import com.main.server.playlist.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatroomService {

    private final ChatroomRepository chatroomRepository;
    private final MemberService memberService;
    private final PlaylistService playlistService;

    private Map<Long, ChatSongQueue> queueMap = new HashMap<>(); // 메모리로 채팅룸 노래 관리

    public Chatroom createRoom(ChatroomCreateDto dto, String email, Long playlistId) {
        Chatroom chatroom = chatroomRepository.save(Chatroom.builder()
                .member(memberService.findByEmail(email))
                .title(dto.getTitle())
                .build());

        queueMap.put(chatroom.getChatroomId(), new ChatSongQueue());

        if (playlistId != null) {
            queueMap.get(chatroom.getChatroomId())
                    .addPlaylistSongs(playlistService.findPlaylistById(playlistId));
        }

        return chatroom;
    }

    public Chatroom findVerifiedRoomId(Long chatroomId) {
        Chatroom chatroom = chatroomRepository.findById(chatroomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ROOM_NOT_FOUND));

        return chatroom;
    }

    public void addSongToRoom(Long chatroomId, ChatSong song) {
        queueMap.get(chatroomId).addSong(song);
    }

    public boolean switchNextSong(Long chatroomId, ChatSongRequestDto key) {
        return queueMap.get(chatroomId).nextSong(key);
    }

    public ChatSongResponseDto getSongAtRoom(Long chatroomId) {
        ChatSongQueue queue = queueMap.get(chatroomId);

        return new ChatSongResponseDto(queue.getNowSong(),
                Duration.between(queue.getPlayedAt(), LocalDateTime.now()).getSeconds());
    }
}
