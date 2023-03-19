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

    private Integer likeQ;

    public Like(Integer likeQ, Member member, Board board) {
        this.member = member;
        this.board = board;
        this.likeQ = likeQ;

    }


    // BOARD_ID

//    @ManyToOne
//    @JoinColumn(name = "PLAYLIST_ID")
//    private Playlist playlist;



    // BOARD_ID

//    public Like(Member member, Board board, Playlist playlist) {
//        this.member = member;
//        this.board = board;
//        this.playlist = playlist;
        /**/
//    }
}
