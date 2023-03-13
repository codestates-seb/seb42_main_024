package com.main.server.playlist.entity;


import com.main.server.audit.Auditable;
import com.main.server.comment.entity.Comment;
import com.main.server.like.entity.Like;
import com.main.server.member.entity.Member;
import com.main.server.song.entity.Song;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Playlist extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playlistId;

    @Column(length = 100,nullable = false)
    private String title;
    //length

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "playlist")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "playlist")
    private List<Song> songs = new ArrayList<>();

    @OneToMany(mappedBy = "playlist")
    private List<Like> likes = new ArrayList<>();








    public Playlist(String title, Member member) {
        this.title = title;
        this.member = member;
    }
}
