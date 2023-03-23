package com.main.server.comment.dto;


import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
public class CommentResponseDto {
    private Long commentId;
    private Long groupId;
    private String commentContent;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
//     private Boolean isVote; 이미 투표를 햇는지 안햇는지 , 이 기능은 보드에도 들어가야 함.
    private Long likeCount;
    private Long memberId;

    private Boolean isVote;
}