package com.main.server.chat.data;

import com.main.server.chat.dto.ChatSongRequestDto;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.playlist.entity.Playlist;
import com.main.server.song.entity.Song;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.Queue;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class ChatSongQueue {

    private Queue<ChatSong> songQueue = new LinkedList<>();

    @Setter
    private ChatSong nowSong;

    @Setter
    private LocalDateTime playedAt;

    public void addSong(ChatSong song) {
        if (songQueue.size() >= 30) {
            throw new BusinessLogicException(ExceptionCode.FULL_SONG);
        }
        songQueue.add(song);
    }

    public void addPlaylistSongs(Playlist playlist) {
        songQueue.addAll(playlist.getSongs().stream()
                .map(Song::getVideoId)
                .map(ChatSong::new)
                .collect(Collectors.toList()));

        this.nowSong = this.songQueue.poll();
        this.playedAt = LocalDateTime.now();
    }

    public boolean nextSong(ChatSongRequestDto dto) {
        if (this.nowSong == null) {
            throw new BusinessLogicException(ExceptionCode.NO_SONG);
        }
        if (dto.getVideoId().equals(this.nowSong.getVideoId())) {
            this.nowSong = songQueue.poll();
            this.playedAt = LocalDateTime.now();
            return true;
        }
        return false;
    }
}
