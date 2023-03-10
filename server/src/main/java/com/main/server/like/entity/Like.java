package com.main.server.like.entity;

import com.main.server.audit.Auditable;
import com.main.server.member.entity.Member;
import com.main.server.playlist.entity.Playlist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "likes")
@Getter
@Setter
@NoArgsConstructor
public class Like extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    // MEMBER_ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PLAYLIST_ID")
    private Playlist playlist;
    // PLAYLIST_ID


    public Like(Member member, Playlist playlist) {
        this.member = member;
        this.playlist = playlist;
    }
}
