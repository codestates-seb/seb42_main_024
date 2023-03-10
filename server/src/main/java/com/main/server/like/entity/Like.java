package com.main.server.like.entity;

import com.main.server.member.entity.Member;
import com.main.server.board.entity.Board;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    // MEMBER_ID

    @ManyToOne
    @JoinColumn(name = "Board_ID")
    private Board board;
    // BOARD_ID


    public Like(Member member, Board board) {
        this.member = member;
        this.board = board;
    }
}
