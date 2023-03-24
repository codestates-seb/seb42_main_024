package com.main.server.playlist.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.global.config.PropertyVariable;
import com.main.server.member.entity.Member;
import com.main.server.member.service.MemberService;
import com.main.server.playlist.dto.PlaylistCreateDto;
import com.main.server.playlist.dto.PlaylistUpdateDto;
import com.main.server.playlist.entity.Playlist;
import com.main.server.playlist.repository.PlaylistRepository;
import com.main.server.song.entity.Song;
import com.main.server.song.repository.SongRepository;
import com.main.server.song.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional // 해당 어노테이션 붙이면 yml 프로퍼티값을 못얻어옴 (or 초기화됨), 원인 모름
@RequiredArgsConstructor
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final MemberService memberService;
    private final SongRepository songRepository;

    public Playlist createPlaylist(PlaylistCreateDto dto, String email) {
        Member findMember = memberService.findByEmail(email);

        if (findMember.getPlaylistCount() >= PropertyVariable.PLAYLIST_CREATE_LIMIT) {
            throw new BusinessLogicException(ExceptionCode.PLAYLIST_FULL);
        }

        List<Song> songList = dto.getSongList().stream()
                .map(Song::createByDto)
                .collect(Collectors.toList());

        Playlist playlist = Playlist
                .createByDto(dto, findMember)
                .updateSong(songList);

        return playlistRepository.save(playlist);
    }

    public Playlist findPlaylistById(Long playlistId) {
        return playlistRepository.findById(playlistId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PLAYLIST_NOT_FOUND));
    }

    public List<Playlist> findPlaylistsByMember(Member member) {
        return playlistRepository.findByMember(member);
    }

    public void updatePlaylist(Playlist playlist, PlaylistUpdateDto dto) {
        List<Song> songList = dto.getSongList().stream()
                .map(Song::createByDto)
                .collect(Collectors.toList());

        songRepository.deleteAll(playlist.getSongs());

        playlist.updateSong(songList);
        playlistRepository.save(playlist);
    }

    public void deletePlaylistById(Long playlistId) {
        playlistRepository.deleteById(playlistId);
    }
}
