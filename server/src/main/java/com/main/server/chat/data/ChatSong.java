package com.main.server.chat.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
public class ChatSong {

    private String videoId;

    public ChatSong(String videoId) {
        this.videoId = videoId;
    }
}
