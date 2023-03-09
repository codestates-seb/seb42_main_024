package com.main.server.like.entity;

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

public class Likevote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likevoteId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    // MEMBER_ID

    @ManyToOne
    @JoinColumn(name = "PLAYLIST_ID")
    private Playlist playlist;
    // PLAYLIST_ID


    public Likevote(Member member, Playlist playlist) {
        this.member = member;
        this.playlist = playlist;
    }
}
