package com.main.server.song.entity;

import com.main.server.audit.Auditable;
import com.main.server.playlist.entity.Playlist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Song {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long songId;
    // PLAYLIST_ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PLAYLIST_ID")
    private Playlist playlist;
    //length

    @Column(length = 100, nullable = false)
    private String title;
    //length

    @Column(length = 1000, nullable = false)
    private String url;
    //length


    public Song(Playlist playlist, Long songId, String title, String url) {
        this.playlist = playlist;
        this.songId = songId;
        this.title = title;
        this.url = url;
    }
}
