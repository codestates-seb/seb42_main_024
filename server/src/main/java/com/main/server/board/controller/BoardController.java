package com.main.server.board.controller;

import com.main.server.board.entity.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.main.server.board.service.BoardService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @PostMapping("/boards/write")
    public Board writeBoard(Board board){
        return boardService.save(board);
    }

    @GetMapping("/boards/list")
    public List boardList(Board board){
        return boardService.boardList();
    }

    @GetMapping("/boards/{board-id}")
    public Board boardView(Board board, Long boardId){
        return boardService.boardView(boardId);
    }

    @DeleteMapping("/boards/delete")
    public void boardDelete(Long boardId){
        boardService.delete(boardId);
    }

}
