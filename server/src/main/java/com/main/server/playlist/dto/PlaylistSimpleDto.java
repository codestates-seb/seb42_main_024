package com.main.server.playlist.dto;

import com.main.server.playlist.entity.Playlist;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PlaylistSimpleDto {

    private Long playlistId;

    private String title;

    private String author;

    private String thumbnail;

    public static PlaylistSimpleDto createByPlaylist(Playlist playlist) {
        return new PlaylistSimpleDto(
                playlist.getPlaylistId(),
                playlist.getTitle(),
                playlist.getMember().getNickname(),
                playlist.getThumbnail());
    }
}
