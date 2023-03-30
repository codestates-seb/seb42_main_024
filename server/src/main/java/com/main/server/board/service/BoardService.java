package com.main.server.board.service;


import com.main.server.comment.dto.CommentResponseDto;
import com.main.server.comment.entity.Comment;
import com.main.server.comment.mapper.CommentMapper;
import com.main.server.comment.repository.CommentRepository;
import com.main.server.board.dto.BoardResponseDto;
import com.main.server.board.entity.Board;
import com.main.server.board.mapper.BoardMapper;
import com.main.server.board.repository.BoardRepository;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.like.service.FindLikeService;
import com.main.server.member.entity.Member;
import com.main.server.playlist.service.PlaylistService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
@AllArgsConstructor
public class BoardService {

    private BoardRepository boardRepository;
    private CommentRepository commentRepository;
    private CommentMapper commentMapper;
    private BoardMapper boardMapper;
    private PlaylistService playlistService;

    private FindLikeService findLikeService;
    private FindBoardService findBoardService;
    

    public Board saveBoard(Board board) {
        String time = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHssSSS");
        Calendar dateTime = Calendar.getInstance();
        time = sdf.format(dateTime.getTime());
        String random = String.valueOf((int) (Math.random() * 100));
        Long unique = Long.parseLong(time + random);
        board.setGroupId(unique);

        board.setCreatedAt(LocalDateTime.now());

        boardRepository.save(board);
        return board;
    }

    public BoardResponseDto findBoard(Long boardId) {
        Board board = boardRepository.findById(boardId).get(); // * orElseThrow로 익셉션
        Long viewCount = board.getViewCount() + 1; //조회수
        board.setViewCount(viewCount);
        boardRepository.save(board);

        Long groupId = board.getGroupId();
        List<Comment> comments = commentRepository.findByGroupId(groupId);
        List<CommentResponseDto> commentDtos = new ArrayList<>();
        for (Comment comment : comments) {
            commentDtos.add(commentMapper.commentToCommentResponseDto(comment));
        }
        return new BoardResponseDto<>(boardMapper.boardToBoardResponseDto(board), commentDtos, null, null);
    }


    public void deleteBoard(Long boardId, Long memberId) {
        Board board = boardRepository.findById(boardId).get();
        Long groupId = board.getGroupId();

        if (board.getMember().getMemberId().equals(memberId)) {
            playlistService.deletePlaylistById(board.getPlaylistId());
            boardRepository.deleteById(boardId);
        } else {
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOWED);
        }
    }

    public void patchBoard(Board board, Long memberId) {
        if (board.getMember().getMemberId().equals(memberId)) {
            board.setModifiedAt(LocalDateTime.now());
            boardRepository.save(board);

        } else {
            throw new BusinessLogicException(ExceptionCode.NOT_ALLOWED);
        }
    }



        public Page<Board> searchBoard( int page, String searchString, String sortBy, String sortDir){
            PageRequest pageRequest; //페이지 만들어주는 친구
            if (sortDir.equals("ASC")) { //ascending
                pageRequest = PageRequest.of(page, 10, Sort.by(sortBy).ascending());
            } else {
                pageRequest = PageRequest.of(page, 10, Sort.by(sortBy).descending());
            }
            return boardRepository.findByBoardContentContaining(searchString, pageRequest);
        }

        public Page<Board> findAllBoards ( int page, String sortBy, String sortDir){
            PageRequest pageRequest;
            if (sortDir.equals("ASC")) {
                pageRequest = PageRequest.of(page, 10, Sort.by(sortBy).ascending());
            } else {
                pageRequest = PageRequest.of(page, 10, Sort.by(sortBy).descending());
            }
            return boardRepository.findAll(pageRequest);
        }
    }


