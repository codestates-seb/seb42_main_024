package com.main.server.board.service;

import com.main.server.board.dto.BoardRequestDto;
import com.main.server.board.dto.BoardResponseDto;
import com.main.server.board.entity.Board;
import com.main.server.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional
    public Long save(BoardRequestDto boardRequestDto) {
        Board board = boardRepository.save(boardRequestDto.toEntity());
        return board.getBoardId();
    }

    public List<BoardResponseDto> findAll() {
        Sort sort = Sort.by(Sort.Direction.DESC, "boardId", "createdDate");
        List<Board> list = boardRepository.findAll(sort);
        return list.stream().map(BoardResponseDto::new).collect(Collectors.toList());
    }

    @Transactional
    public Long update(Long boardId, BoardRequestDto boardRequestDto) {
        Board board = boardRepository.findByBoardId(boardId).orElseThrow();
        board.updateBoard(boardRequestDto.getTitle(), boardRequestDto.getContent(), boardRequestDto.getMember());
        return boardId;
    }


}
