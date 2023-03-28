package com.main.server.board.controller;

import com.main.server.board.PageInfo;
import com.main.server.board.dto.*;
import com.main.server.board.entity.Board;
import com.main.server.member.entity.Member;
import com.main.server.board.mapper.BoardMapper;
import com.main.server.board.repository.BoardRepository;
import com.main.server.board.service.BoardService;
import com.main.server.dto.SingleResponseDto;
import com.main.server.member.service.MemberService;
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
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/boards")
public class BoardController {
    private BoardService boardService;
    private MemberService memberService;
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

    @GetMapping("/all")
    public ResponseEntity getAllBoardsNoLimit()
    {
        List<Board> all= boardRepository.findAll(); //모든 보드들의 정보를 불러온다
        List<BoardDto> BoardDtoList = new ArrayList<>(); // 보드를 보드dto로 변환시킨 후 담길 리스트를 만든다
        for(Board board : all){
            BoardDto boardDto = boardMapper.boardToBoardResponseDto(board); // BoardDto라는건
            // boardMapper의 boardresponsedto라는 메서드에서 파라미터 board를 받아 boarddto로 바꿔준다
            BoardDtoList.add(boardDto); // 리스트에 넣어준다
        }

        return new ResponseEntity<>(BoardDtoList,HttpStatus.OK); //리턴해준다
    }
    @PostMapping
    public ResponseEntity postBoard(@Valid @RequestBody BoardPostDto boardDto, @AuthenticationPrincipal String email) {
        Playlist playlist = playlistService.createPlaylist(boardDto.getPlaylist(), email);
        boardDto.setPlaylistId(playlist.getPlaylistId());
        Board board = boardService.saveBoard(boardMapper.boardPostDtoToBoard(boardDto));
        return new ResponseEntity<>(board.getBoardId(),HttpStatus.CREATED);
    }

    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable(name="board-id") Long boardId) {
        BoardResponseDto board = boardService.findBoard(boardId);
        board.setPlaylist(PlaylistResponseDto.createByEntity(
                playlistService.findPlaylistById(board.getBoard().getPlaylistId())));
        return new ResponseEntity<>(new SingleResponseDto<>(board), HttpStatus.OK);
    }

    @DeleteMapping("/{board-id}") // * member-id를 PathVariable로 가져오는거는 보안적으로 취약하므로 AuthenticationPrincipal 사용
    public ResponseEntity deleteBoard(@PathVariable(name="board-id") Long boardId,
                                      @AuthenticationPrincipal String email ) {
        Member member = memberService.findByEmail(email);
        boardService.deleteBoard(boardId,member.getMemberId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{board-id}") // *
    public ResponseEntity patchBoard(@RequestBody BoardPatchDto boardPatchDto, @PathVariable(name="board-id") Long boardId, @AuthenticationPrincipal String email) {
        System.out.println("BoardController.patchBoard");
        Member member = memberService.findByEmail(email);
        boardService.patchBoard(boardMapper.boardPatchDtoToBoard(boardPatchDto, boardId), member.getMemberId());
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

