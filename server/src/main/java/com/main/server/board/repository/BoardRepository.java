package com.main.server.board.repository;

import com.main.server.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {


    Page<Board> findByBoardContentContaining(String searchString, Pageable pageable);


    //보드 표시




}
