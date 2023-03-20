package com.main.server.like.entity;


import com.main.server.member.entity.Member;
import com.main.server.board.entity.Board;
import com.main.server.audit.Auditable;

import com.main.server.playlist.entity.Playlist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Entity(name = "likes")
@Getter
@Setter
@NoArgsConstructor
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    // MEMBER_ID

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
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
