package com.main.server.board.dto;

import com.main.server.audit.Auditable;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardDto extends Auditable {


    private Long boardId;
    private String title;
    private String contents;
    private String writerId;

}
