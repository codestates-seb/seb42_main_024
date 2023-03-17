package com.main.server.comment.mapper;


import com.main.server.comment.dto.CommentPostDto;
import com.main.server.comment.dto.CommentPatchDto;
import com.main.server.comment.dto.CommentResponseDto;
import com.main.server.comment.entity.Comment;
import com.main.server.comment.repository.CommentRepository;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import com.main.server.board.entity.Board;
import com.main.server.board.repository.BoardRepository;
//import com.main.server.vote.Vote;
//import com.main.server.vote.VoteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@AllArgsConstructor
public class CommentMapper {

    private MemberRepository memberRepository;
    private BoardRepository boardRepository;
    private CommentRepository commentRepository;
    // private VoteRepository voteRepository;

    public Comment commentPostDtoToComment(CommentPostDto commentPostDto) {
        Comment comment = new Comment();
        comment.setCommentContent(commentPostDto.getCommentContent());
        Member member = memberRepository.findById(commentPostDto.getMemberId()).get();
        comment.setMember(member);
        Board board = boardRepository.findById(commentPostDto.getBoardId()).get();

        return comment;
    }

    public Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto, Long commentId) {

        Comment comment = commentRepository.findById(commentId).get();
        if (commentPatchDto.getCommentContent() != null) {
            comment.setCommentContent(commentPatchDto.getCommentContent());
        }
        return comment;
    }
}
/*  Like 구문
    public CommentResponseDto commentToCommentResponseDto(Comment comment) {
        CommentResponseDto commentResponseDto = new CommentResponseDto();
        commentResponseDto.setCommentId(comment.getCommentId());
        commentResponseDto.setCommentContent(comment.getCommentContent());
        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setModifiedAt(comment.getModifiedAt());
        commentResponseDto.setMemberId(comment.getMember().getMemberId());
         commentResponseDto.setLikeCount(voteRepository.countAllByCommentAndVoteTypeNot(comment, Vote.VoteType.HATE));
        commentResponseDto.setHateCount(voteRepository.countAllByCommentAndVoteTypeNot(comment, Vote.VoteType.LIKE));
          System.out.println("//////////////////////////////////////////////////////////////////////////////////////");
         System.out.println(voteRepository.findByCommentAndMember(comment, comment.getMember()));
        if(voteRepository.findByCommentAndMember(comment, comment.getMember()) != null) {
           commentResponseDto.setIsVote(true);
         } else {
             commentResponseDto.setIsVote(false);
          }
         return commentResponseDto;
          }


 */