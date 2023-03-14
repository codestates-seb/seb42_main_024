package com.main.server.playlist.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class LikePlaylistResponseDto {

    private long playlistId;

    private long memberId;

    private String name;

    private String content;


    private boolean status; // ?

    private String title;

    private int like; // 좋아요 갯수?

    private Boolean likeState; // 눌럿음?

    // private Boolean bookmarkState;

    private List<PlaylistItemResponseDto> playlistItems;

    // private List<String> categoryList;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}

