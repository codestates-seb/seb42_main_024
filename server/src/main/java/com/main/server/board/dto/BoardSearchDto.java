package com.main.server.board.dto;


import lombok.Getter;

@Getter
public class BoardSearchDto {
    private int page;
    private String keyword; // 검색 키워드
    private int sortBy; // 정렬 방식
    private int sortDir;

}
