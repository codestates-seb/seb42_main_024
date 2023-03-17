package com.main.server.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class BoardPostDto {
    private Long memberId;
    private String boardContent;
}
