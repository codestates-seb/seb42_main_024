package com.main.server.playlist.service;

import com.main.server.member.service.MemberService;
import com.main.server.playlist.dto.PlaylistCreateDto;
import com.main.server.playlist.entity.Playlist;
import com.main.server.playlist.repository.PlaylistRepository;
import com.main.server.song.entity.Song;
import com.main.server.song.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final SongService songService;
    private final MemberService memberService;

    public Playlist createPlaylist(PlaylistCreateDto dto, String email) {
        List<Song> songList = dto.getSongList().stream()
                .map(Song::createByDto)
                .collect(Collectors.toList());

        Playlist playlist = Playlist
                .createByDto(dto, memberService.findByEmail(email))
                .addSongs(songList);

        return playlistRepository.save(playlist);
    }
}
