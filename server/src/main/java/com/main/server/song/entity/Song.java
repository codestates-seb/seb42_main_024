package com.main.server.song.entity;

import com.main.server.audit.Auditable;
import com.main.server.playlist.entity.Playlist;
import com.main.server.song.dto.SongCreateDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Song extends Auditable {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long songId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PLAYLIST_ID")
    private Playlist playlist;

    @Column(nullable = false)
    private String videoId;

    @Column(nullable = false)
    private String title;

    private String thumbnail;

    public static Song createByDto(SongCreateDto dto) {
        return new Song(
                dto.getVideoId(),
                dto.getTitle(),
                dto.getThumbnail());
    }

    public Song setPlaylist(Playlist playlist) {
        this.playlist = playlist;
        return this;
    }

    private Song(String videoId, String title, String thumbnail) {
        this.videoId = videoId;
        this.title = title;
        this.thumbnail = thumbnail;
    }
}
