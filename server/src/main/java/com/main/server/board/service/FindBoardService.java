package com.main.server.board.service;

import com.main.server.board.entity.Board;
import com.main.server.board.repository.BoardRepository;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FindBoardService {
    private final BoardRepository boardRepository;

    public Board id(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
    }
}
