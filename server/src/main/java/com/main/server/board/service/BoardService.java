package com.main.server.board.service;

import com.main.server.board.entity.Board;
import com.main.server.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    @Autowired
    private final BoardRepository boardRepository;

    public Board save(Board board) {
        Board savedBoard = boardRepository.save(board);
        return savedBoard;
    }

    public Board findByBoardId(Long boardId){
        Board findBoard = boardRepository.findByBoardId(boardId);
        return findBoard;
    }

    public Board boardView(Long boardId) {
        return boardRepository.findById(boardId).get();
    }

    public List<Board> boardList() {
        return boardRepository.findAll();
    }

//    public void count(Board board) {
//        boardRepository.count();
//    }

    public void delete(Long boardId) {
        Board board = findByBoardId(boardId);
        boardRepository.delete(board);
    }



}
