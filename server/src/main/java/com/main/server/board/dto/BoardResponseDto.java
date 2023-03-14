package com.main.server.board.dto;

import com.main.server.board.entity.Board;

import java.time.LocalDateTime;

public class BoardResponseDto {

    private Long boardId;
    private String title;
    private String content;
    private String nickname;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public BoardResponseDto(Board entity) {
        this.boardId = entity.getBoardId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.nickname = entity.getMember().getNickname();
        this.createdDate = entity.getCreatedAt();
        this.modifiedDate = entity.getModifiedAt();
    }

}
