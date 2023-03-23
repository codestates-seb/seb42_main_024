package com.main.server.playlist.dto;

import com.main.server.playlist.entity.Playlist;
import com.main.server.song.dto.SongResponseDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PlaylistResponseDto {

    private Long playlistId;

    private String title;

    private String author;

    private String thumbnail;

    private List<SongResponseDto> songList;

    private Integer songCount;

    public static PlaylistResponseDto createByEntity(Playlist playlist) {
        return new PlaylistResponseDto(
                playlist.getPlaylistId(),
                playlist.getTitle(),
                playlist.getMember().getNickname(),
                playlist.getThumbnail(),
                playlist.getSongs().stream()
                        .map(SongResponseDto::createByEntity)
                        .collect(Collectors.toList()),
                playlist.getSongs().size());
    }
}
