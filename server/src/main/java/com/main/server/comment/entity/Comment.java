package com.main.server.comment.entity;

import com.main.server.audit.Auditable;
import com.main.server.member.entity.Member;
import com.main.server.playlist.entity.Playlist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PLAYLIST_ID")
    private Playlist playlist;
    // PLAYLIST_ID


    @Column(length = 1000,nullable = false)
    private String content;
    //length

    private Boolean isSong;
    // 구상 - 댓글 단 시점 가져와서 선착순으로 정렬, 공간 조금 할애해서 신청곡 리스트 편성.


    public Comment(Member member, Playlist playlist, String content, Boolean isSong) {
        this.member = member;
        this.playlist = playlist;
        this.content = content;
        this.isSong = isSong;
    }
}
