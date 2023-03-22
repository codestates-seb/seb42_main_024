package com.main.server.board.dto;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BoardResponseDto<T> {
    private BoardDto board;
    private T comments; // 코멘트
    private Boolean isVote;
}

