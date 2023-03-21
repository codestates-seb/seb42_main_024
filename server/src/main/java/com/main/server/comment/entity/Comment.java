package com.main.server.comment.entity;

import com.main.server.board.entity.Board;
import com.main.server.audit.Auditable;
import com.main.server.member.entity.Member;
import com.main.server.playlist.entity.Playlist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    // MEMBER_ID


    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;
    // BOARD_ID

    @ManyToOne
    @JoinColumn(name = "PLAYLIST_ID")
    private Playlist playlist;
    // PLAYLIST_ID



    @Column(length = 1000,nullable = false)
    private String commentContent;
    //length

    private Long likeCount = 0L;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private Long groupId;

    public Comment(Member member, Board board, String commentContent) {
        this.member = member;
        this.board = board;
        this.commentContent = commentContent;
    }
}
