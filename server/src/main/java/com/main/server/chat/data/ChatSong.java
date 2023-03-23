package com.main.server.chat.data;

import com.main.server.song.entity.Song;
import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatSong {

    private String videoId;

    private String title;

    private String thumbnail;

    public static ChatSong createBySong(Song song) {
        return new ChatSong(
                song.getVideoId(),
                song.getTitle(),
                song.getTitle());
    }
}
