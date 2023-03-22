package com.main.server.comment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentPatchDto {
    private Long memberId;
    private String commentContent;

}