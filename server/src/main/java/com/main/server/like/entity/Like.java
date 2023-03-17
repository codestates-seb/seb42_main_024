package com.main.server.like.entity;
import com.main.server.board.entity.Board;
import com.main.server.member.entity.Member;
import lombok.*;
import org.hibernate.validator.internal.util.stereotypes.Lazy;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "like Id")
    private Long likeId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_Id")
    private Board board;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_Id")
    private Member member;

    private Integer vote;

    @Builder
    public Like(Board board, Member member, Integer vote) {
        this.board = board;
        this.member = member;
        this.vote = vote;
    }
}
