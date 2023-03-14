package com.main.server.board.controller;

import com.main.server.board.dto.BoardRequestDto;
import com.main.server.board.dto.BoardResponseDto;
import com.main.server.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardApiController {

    private final BoardService boardService;


    @PostMapping("/boards")
    public Long save(@RequestBody final BoardRequestDto boardRequestDto){
        return boardService.save(boardRequestDto);
    }

    @GetMapping
    public List<BoardResponseDto> findAll() {
        return boardService.findAll();
    }

    @PatchMapping("/boards/{id}")
    public Long save(@PathVariable final Long boardId, @RequestBody final BoardRequestDto boardRequestDto){
        return boardService.update(boardId, boardRequestDto);
    }

}
