package com.main.server.comment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentPostDto {
    private Long memberId;
    private Long boardId;
    private String commentContent;

}
