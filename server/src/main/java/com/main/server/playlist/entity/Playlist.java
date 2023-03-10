package com.main.server.playlist.entity;


import com.main.server.comment.entity.Comment;
import com.main.server.like.entity.Like;
import com.main.server.member.entity.Member;
import com.main.server.song.entity.Song;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.catalina.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playlistId;

    @Column(length = 100,nullable = false, unique = true)
    private String title;
    //length

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    // MEMBER_ID

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
