package com.main.server.board.dto;

import com.main.server.playlist.dto.PlaylistCreateDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardPostDto {
    private Long memberId;
    private String boardContent;
    private String boardTitle;
    private Long playlistId;
    private String boardThumb;
    private PlaylistCreateDto playlist;
}
