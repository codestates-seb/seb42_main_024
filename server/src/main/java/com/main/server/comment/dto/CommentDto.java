package com.main.server.comment.dto;



import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDto {
    private Long commentId;
    private Long groupId;
    @Column(length = 100, nullable = false, unique = true)
    private String nickname;
    private String commentContent;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String boardThumb; // (수정필요) 보드가 리스트로 노출되면 이미지 담당1
    private Long MemberId; // 작성자, M대문자 맞음
}
