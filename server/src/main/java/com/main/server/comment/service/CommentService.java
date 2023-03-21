package com.main.server.comment.service;

import com.main.server.comment.entity.Comment;
import com.main.server.comment.repository.CommentRepository;
//import com.main.server.exception.BusinessLogicException;
//import com.main.server.exception.ExceptionCode;
import com.main.server.board.entity.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class
CommentService {
    private final CommentRepository commentRepository;

    public void saveComment(Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        commentRepository.save(comment);
    }

    public void deleteComment(Long commentId, Long memberId) {
        Comment comment = commentRepository.findById(commentId).get();
        if (comment.getMember().getMemberId().equals(memberId)) {
            commentRepository.delete(comment);
        } else {
          //  throw new BusinessLogicException(ExceptionCode.NOT_ALLOWED);
        }
    }

    public void patchComment(Comment comment, Long memberId) {
        if (comment.getMember().getMemberId().equals(memberId)) {
            comment.setModifiedAt(LocalDateTime.now());
            commentRepository.save(comment);
        } else {
           // throw new BusinessLogicException(ExceptionCode.NOT_ALLOWED);
        }
    }
}