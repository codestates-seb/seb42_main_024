package com.main.server.song.entity;

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
    @ManyToOne
    @JoinColumn(name = "PLAYLIST_ID")
    private Playlist playlist;
    // PLAYLIST_ID

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long songId;
    //length

    @Column(length = 100,nullable = false, unique = true)
    private String title;
    //length

    @Column(length = 100,nullable = false, unique = true)
    private String url;
    //length


    public Song(Playlist playlist, Long songId, String title, String url) {
        this.playlist = playlist;
        this.songId = songId;
        this.title = title;
        this.url = url;
    }
}
