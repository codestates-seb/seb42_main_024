package com.main.server.song.dto;

import com.main.server.song.entity.Song;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SongResponseDto {

    private Long songId;

    private String videoId;

    private String title;

    private String thumbnail;

    public static SongResponseDto createByEntity(Song song) {
        return new SongResponseDto(
                song.getSongId(),
                song.getVideoId(),
                song.getTitle(),
                song.getThumbnail());
    }
}
