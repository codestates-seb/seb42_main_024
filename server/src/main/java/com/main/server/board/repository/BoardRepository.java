package com.main.server.board.repository;

import com.main.server.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board,Long> {


    Optional<Board> findByBoardId(Long boardId);




}
