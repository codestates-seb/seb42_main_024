package com.main.server.board.dto;



import com.main.server.playlist.dto.PlaylistResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BoardResponseDto<T> {
    private BoardDto board;
    private T comments;
    private Boolean isVote;
    private PlaylistResponseDto playlist;
}

