package com.main.server.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class BoardPatchDto {
    private Long memberID;
    private String boardContent;
    private String boardTitle;
    private String boardThumb;
}
