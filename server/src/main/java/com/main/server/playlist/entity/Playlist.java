package com.main.server.playlist.entity;


import com.main.server.comment.entity.Comment;
import com.main.server.like.entity.Likevote;
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

    @Column(length = 100,nullable = false, unique = true)
    private String content;
    //length

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member memberId;

    @OneToMany(mappedBy = "playlist")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "playlist")
    private List<Song> songs = new ArrayList<>();

    @OneToMany(mappedBy = "playlist")
    private List<Likevote> likes = new ArrayList<>();








    public Playlist(String title, String content, Member memberId) {
        this.title = title;
        this.content = content;
        this.memberId = memberId;
    }


}
