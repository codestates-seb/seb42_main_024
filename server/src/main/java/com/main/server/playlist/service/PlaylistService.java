package com.main.server.playlist.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.service.MemberService;
import com.main.server.playlist.dto.PlaylistCreateDto;
import com.main.server.playlist.entity.Playlist;
import com.main.server.playlist.repository.PlaylistRepository;
import com.main.server.song.entity.Song;
import com.main.server.song.service.SongService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Transient;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional // 해당 어노테이션 붙이면 yml 프로퍼티값을 못얻어옴 (or 초기화됨), 원인 모름
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

    public Playlist findPlaylistById(Long playlistId) {
        return playlistRepository.findById(playlistId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PLAYLIST_NOT_FOUND));
    }

    public void deletePlaylistById(Long playlistId) {
        playlistRepository.deleteById(playlistId);
    }
}
