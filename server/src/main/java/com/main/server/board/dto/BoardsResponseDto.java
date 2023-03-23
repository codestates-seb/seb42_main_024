package com.main.server.board.dto;


import lombok.Getter;

@Getter
public class BoardsResponseDto<T> {
    private BoardDto board;
    private T comments;
}
