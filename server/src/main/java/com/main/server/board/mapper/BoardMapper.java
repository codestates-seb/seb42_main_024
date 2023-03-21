package com.main.server.board.mapper;


import com.main.server.board.dto.BoardDto;
import com.main.server.board.dto.BoardPatchDto;
import com.main.server.board.dto.BoardPostDto;
import com.main.server.board.entity.Board;
import com.main.server.board.repository.BoardRepository;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Component
public class BoardMapper {
    private MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    public Board boardPostDtoToBoard(BoardPostDto boardPostDto) {
        Board board = new Board();
        board.setBoardContent(boardPostDto.getBoardContent());
        System.out.println(boardPostDto.getMemberId());
        Member member = memberRepository.findById(boardPostDto.getMemberId()).get();
        board.setMember(member);
        return board;
    }

    public Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto, Long boardId) {
        Board board = boardRepository.findById(boardId).get();

        if(boardPatchDto.getBoardContent() != null) {
            board.setBoardContent(boardPatchDto.getBoardContent());
        }
        return board;
    }

    public BoardDto boardToBoardResponseDto(Board board) {
        BoardDto boardDto = new BoardDto();
        boardDto.setBoardId(board.getBoardId());
        boardDto.setBoardContent(board.getBoardContent());
        boardDto.setCreatedAt(board.getCreatedAt());
        boardDto.setModifiedAt(board.getModifiedAt());
        boardDto.setLikeCount(board.getLikeCount());
        boardDto.setViewCount(board.getViewCount());
        boardDto.setMemberId(board.getMember().getMemberId());
        return boardDto;
    }

    public List<BoardDto> boardsToBoardResponseDto(List<Board> boards) {
        if(boards == null) return null;

        List<BoardDto> list = new ArrayList<>(boards.size());
        for(Board board : boards) {
            list.add(boardToBoardResponseDto(board));
        }
        return list;
    }
}
