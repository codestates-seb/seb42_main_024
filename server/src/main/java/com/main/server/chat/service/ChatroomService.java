package com.main.server.chat.service;

import com.main.server.chat.data.ChatSongQueue;
import com.main.server.chat.data.ChatSong;
import com.main.server.chat.dto.ChatSongResponseDto;
import com.main.server.chat.dto.ChatroomCreateDto;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.repository.ChatroomRepository;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.entity.Member;
import com.main.server.playlist.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatroomService {

    private final ChatroomRepository chatroomRepository;
    private final PlaylistService playlistService;
    private final ChatService chatService;

    private Map<Long, ChatSongQueue> queueMap = new HashMap<>(); // 메모리로 채팅룸 노래 관리

    /**
     * dto 와 인증을통해 조회한 Member 값을 가져와 방 생성
     * @param dto
     * @param member
     * @return
     */
    public Chatroom createRoom(ChatroomCreateDto dto, Member member) {
        if (chatroomRepository.findByMember(member).isPresent()) {
            throw new BusinessLogicException(ExceptionCode.CHATROOM_ALREADY_EXISTS);
        }

        Chatroom chatroom = chatroomRepository.save(Chatroom.builder() // 챗룸을 생성 후 즉시 저장(id값을 얻어서 queueMap에 키값으로 써야함)
                .member(member)
                .title(dto.getTitle())
                .build());

        ChatSongQueue queue = createQueue(dto.getPlaylistId()); // 플레이리스트 유무에따라 다르게 초기화

        queueMap.put(chatroom.getChatroomId(), queue); // ChatSongQueue를 메모리에 저장

        return chatroom;
    }

    /**
     * Id값으로 Chatroom 조회.
     * 없을경우 ROOM_NOT_FOUND 익셉션.
     * @param chatroomId
     * @return
     */
    public Chatroom findChatroomById(Long chatroomId) {
        Chatroom chatroom = chatroomRepository.findById(chatroomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHATROOM_NOT_FOUND));

        return chatroom;
    }

    public List<Chatroom> findChatrooms(Long chatroomId) {
        return chatroomRepository.getChatroomsAfterId(chatroomId);
    }

    /**
     * 해당하는 방에 노래 추가.
     * 이후 노래가 비어있다면 바로 노래를 변경하도록 switchNextSong 호출.
     * @param chatroomId
     * @param song
     */
    public void addSongToRoom(Long chatroomId, ChatSong song) {
        ChatSongQueue queue = queueMap.get(chatroomId);
        queue.addSong(song);
        if (queue.getNowSong() == null) {
            switchNextSong(chatroomId, song); // chatSong은 검증에 필요한 파라미터라 nowSong이 비어있다면 아무값이나 넣어도 됨.
        }

    }

    /**
     * 해당하는 방의 노래를 다음 노래로 변경.
     * 이후 기능 동작 유무를 boolean값으로 리턴.
     * @param chatroomId
     * @param chatSong
     * @return
     */
    public void switchNextSong(Long chatroomId, ChatSong chatSong) {
        if (queueMap.get(chatroomId).nextSong(chatSong)) { // 노래가 바뀌었을 경우
            chatService.sendSystemMessage(chatroomId, "NextSong"); // 다음 노래를 재생하라는 메세지를 구독자들에게 뿌림
        }
    }

    /**
     * 해당 방의 노래를 조회.
     * 지나간 곡 2곡, 진행중인곡, 대기중인 곡 2곡, 초단위의 경과 시간 리턴.
     * @param chatroomId
     * @return
     */
    public ChatSongResponseDto getSongAtRoom(Long chatroomId) {
        return ChatSongResponseDto.createByChatSongQueue(queueMap.get(chatroomId));
    }

    private ChatSongQueue createQueue(Long playlistId) {
        return playlistId != null 
                ? ChatSongQueue.createByPlaylist(playlistService.findPlaylistById(playlistId)) // 플레이리스트 찾아 큐 생성
                : new ChatSongQueue(); // 노래 없는 빈 큐
    }
}
