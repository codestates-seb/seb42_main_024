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
        board.setBoardTitle(boardPostDto.getBoardTitle());
        board.setPlaylistId(boardPostDto.getPlaylistId());
        board.setBoardThumb(boardPostDto.getBoardThumb());


        Member member = memberRepository.findById(boardPostDto.getMemberId()).get();
        board.setMember(member);
        //태그
        return board;
    }

    public Board boardPatchDtoToBoard(BoardPatchDto boardPatchDto, Long boardId) {
        Board board = boardRepository.findById(boardId).get();
        if(boardPatchDto.getBoardTitle() != null) {
            board.setBoardTitle(boardPatchDto.getBoardTitle());
        }
        if(boardPatchDto.getBoardContent() != null) {
            board.setBoardContent(boardPatchDto.getBoardContent());
        }
        if(boardPatchDto.getBoardThumb() != null) {
            board.setBoardThumb(boardPatchDto.getBoardThumb());
        }
        //태그 추가 예정
        return board;
    }

    public BoardDto boardToBoardResponseDto(Board board) {
        BoardDto boardDto = new BoardDto();
        boardDto.setBoardId(board.getBoardId());
        boardDto.setBoardTitle(board.getBoardTitle());
        boardDto.setBoardContent(board.getBoardContent());
        boardDto.setGroupId(board.getGroupId());
        boardDto.setNickname(board.getMember().getNickname());
        boardDto.setCreatedAt(board.getCreatedAt());
        boardDto.setModifiedAt(board.getModifiedAt());
        boardDto.setLikeCount(board.getLikeCount());
        boardDto.setViewCount(board.getViewCount());
        boardDto.setMemberId(board.getMember().getMemberId());
        boardDto.setBoardThumb(board.getBoardThumb());
        boardDto.setPlaylistId(board.getPlaylistId());
        //boardDto.setIsVote();
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
