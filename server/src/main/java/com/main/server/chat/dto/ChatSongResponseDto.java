package com.main.server.chat.dto;

import com.main.server.chat.data.ChatSong;
import com.main.server.chat.data.ChatSongQueue;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatSongResponseDto {

    private List<ChatSong> pastSong;

    private ChatSong nowSong;

    private List<ChatSong> nextSong;

    private Long time;

    /**
     * chatSongQueue의 정보를 토대로
     * 노래가 갱신될때마다 필요한 정보를 프론트에 전달.
     * @param chatSongQueue
     * @return
     */
    public static ChatSongResponseDto createByChatSongQueue(ChatSongQueue chatSongQueue){
        return new ChatSongResponseDto(
                chatSongQueue.getPastSong(),
                chatSongQueue.getNowSong(),
                chatSongQueue.getSongList().subList(0, Math.min(2, chatSongQueue.getSongList().size())), // 최대 2개
                chatSongQueue.getNowSong() != null ? chatSongQueue.getElapsedTime() : null); // 노래가 비어있지 않으면 경과시간을 받아옴
    }
}
