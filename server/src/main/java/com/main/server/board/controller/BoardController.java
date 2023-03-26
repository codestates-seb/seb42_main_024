package com.main.server.board.controller;

import com.main.server.board.PageInfo;
import com.main.server.board.dto.*;
import com.main.server.board.entity.Board;
import com.main.server.board.mapper.BoardMapper;
import com.main.server.board.repository.BoardRepository;
import com.main.server.board.service.BoardService;
import com.main.server.dto.SingleResponseDto;
import com.main.server.playlist.dto.PlaylistResponseDto;
import com.main.server.playlist.entity.Playlist;
import com.main.server.playlist.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/boards")
public class BoardController {
    private BoardService boardService;
    private BoardRepository boardRepository;
    private BoardMapper boardMapper;
    private PlaylistService playlistService;

    @Autowired
    public BoardController(BoardService boardService, BoardRepository boardRepository,
                           BoardMapper boardMapper, PlaylistService playlistService) {
        this.boardService = boardService;
        this.boardRepository = boardRepository;
        this.boardMapper = boardMapper;
        this.playlistService = playlistService;
    }

    @PostMapping
    public ResponseEntity postBoard(@Valid @RequestBody BoardPostDto boardDto, @AuthenticationPrincipal String email) {
        Playlist playlist = playlistService.createPlaylist(boardDto.getPlaylist(), email);
        boardDto.setPlaylistId(playlist.getPlaylistId());
        boardService.saveBoard(boardMapper.boardPostDtoToBoard(boardDto));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{board-id}/{member-id}")
    public ResponseEntity getBoard(@PathVariable(name="board-id") Long boardId, @PathVariable(name="member-id") Long memberId) { // * member-id를 PathVariable로 가져오는거는 보안적으로 추약
        BoardResponseDto board = boardService.findBoard(boardId, memberId);
        board.setPlaylist(PlaylistResponseDto.createByEntity(
                playlistService.findPlaylistById(board.getBoard().getPlaylistId())));
        return new ResponseEntity<>(new SingleResponseDto<>(board), HttpStatus.OK);
    }

    @DeleteMapping("/{board-id}/{member-id}")
    public ResponseEntity deleteBoard(@PathVariable(name="board-id") Long boardId, @PathVariable(name="member-id") Long memberId) {
        boardService.deleteBoard(boardId, memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{board-id}/{member-id}")
    public ResponseEntity patchBoard(@RequestBody BoardPatchDto boardPatchDto, @PathVariable(name="board-id") Long boardId, @PathVariable(name="member-id") Long memberId) {
        System.out.println("BoardController.patchBoard");
        boardService.patchBoard(boardMapper.boardPatchDtoToBoard(boardPatchDto, boardId), memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchBoard(@RequestParam int page, @RequestParam(name="keyword") String searchString,
                                         @RequestParam(defaultValue = "createdAt", name = "sortBy") String sortBy,
                                         @RequestParam(defaultValue = "DESC", name = "sortDir") String sortDir) {
        Page<Board> boardPage = boardService.searchBoard(page - 1, searchString, sortBy, sortDir);
        PageInfo pageInfo = new PageInfo(page - 1, 10, (int) boardPage.getTotalElements(), boardPage.getTotalPages());

        List<Board> boards = boardPage.getContent();
        List<BoardDto> response = boardMapper.boardsToBoardResponseDto(boards);

        return new ResponseEntity<>(new BoardPageDto(response, pageInfo), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllBoards(@RequestParam int page,
                                          @RequestParam(defaultValue = "createdAt", name = "sortBy") String sortBy,
                                          @RequestParam(defaultValue = "DESC", name = "sortDir") String sortDir) {
        Page<Board> boardPage = boardService.findAllBoards(page - 1, sortBy, sortDir);
        PageInfo pageInfo = new PageInfo(page - 1, 10, (int) boardPage.getTotalElements(), boardPage.getTotalPages());

        List<Board> boards = boardPage.getContent();
        List<BoardDto> response = boardMapper.boardsToBoardResponseDto(boards);

        return new ResponseEntity<>(new BoardPageDto(response, pageInfo), HttpStatus.OK);
    }
}

