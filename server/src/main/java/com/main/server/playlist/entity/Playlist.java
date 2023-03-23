package com.main.server.playlist.entity;


import com.main.server.audit.Auditable;
import com.main.server.comment.entity.Comment;
import com.main.server.like.entity.Like;
import com.main.server.member.entity.Member;
import com.main.server.playlist.dto.PlaylistCreateDto;
import com.main.server.song.entity.Song;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Playlist extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playlistId;

    @Column(length = 100,nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    private String thumbnail;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.ALL)
    private List<Song> songs = new ArrayList<>();


    public static Playlist createByDto(PlaylistCreateDto dto, Member member) {
        return new Playlist(
                dto.getTitle(),
                member,
                dto.getThumbnail());
    }

    public Playlist addSongs(List<Song> adds) {
        adds.stream()
                .map(song -> song.setPlaylist(this))
                .collect(Collectors.toList());

        List<Song> editSongs = new ArrayList<>(this.songs);
        editSongs.addAll(adds);
        this.songs = editSongs;
        return this;
    }

    private Playlist(String title,
                    Member member,
                    String thumbnail) {
        this.title = title;
        this.member = member;
        this.thumbnail = thumbnail;
    }
}
