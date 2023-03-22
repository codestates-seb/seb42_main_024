package com.main.server.board.dto;


import com.main.server.board.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BoardPageDto<T> {
    private T data;
    private PageInfo pageInfo;
}
