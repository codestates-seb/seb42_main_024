package com.main.server.board.dto;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
public class BoardDto {
    private Long boardId;
    private Long groupId;
    @Column(length = 100, nullable = false, unique = true)
    private String nickname;
    private String boardContent;
    private String boardTitle;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Long likeCount;
    private Long viewCount; // 조회수
    private Long MemberId; // 작성자
}
