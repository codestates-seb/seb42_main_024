package com.main.server.comment.controller;


import com.main.server.comment.dto.CommentPatchDto;
import com.main.server.comment.dto.CommentPostDto;
import com.main.server.comment.mapper.CommentMapper;
import com.main.server.comment.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/comments")
public class CommentController {
    private CommentService commentService;
    private CommentMapper commentMapper;

    public CommentController(CommentService commentService, CommentMapper commentMapper) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @PostMapping
    public ResponseEntity postComment(@RequestBody CommentPostDto commentPostDto) {
        commentService.saveComment(commentMapper.commentPostDtoToComment(commentPostDto));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@RequestBody CommentPatchDto commentPatchDto, @PathVariable(name="comment-id") Long commentId, @PathVariable(name="member-id") Long memberId) {
        commentService.patchComment(commentMapper.commentPatchDtoToComment(commentPatchDto, commentId), memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}/{member-id}")
    public ResponseEntity deleteComment(@PathVariable(name="comment-id") Long commentId, @PathVariable(name = "member-id") Long memberId) {
        commentService.deleteComment(commentId, memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}