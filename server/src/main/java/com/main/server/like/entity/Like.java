package com.main.server.like.entity;
import com.main.server.board.entity.Board;
import com.main.server.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;
    @ManyToOne
    @JoinColumn(name = "board_Id")
    private Board board;
    @ManyToOne
    @JoinColumn(name = "member_Id")
    private Member member;

    private Integer vote;

    public Like(Board board, Member member, Integer vote) {
        this.board = board;
        this.member = member;
        this.vote = vote;
    }
}
