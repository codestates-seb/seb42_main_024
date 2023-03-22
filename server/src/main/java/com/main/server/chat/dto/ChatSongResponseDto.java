package com.main.server.chat.dto;

import com.main.server.chat.data.ChatSong;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatSongResponseDto {

    private ChatSong song;

    private Long time;
}
