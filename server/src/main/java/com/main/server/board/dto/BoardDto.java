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
    private Long playlistId;
    private String boardThumb; // (수정필요) 보드가 리스트로 노출되면 이미지 담당1
    private Long likeCount = 0L;
    private Long viewCount;
    private Long MemberId; // 작성자, M대문자 맞음
}
