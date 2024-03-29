package com.main.server.playlist.controller;

import com.main.server.global.dto.ResponseDto;
import com.main.server.member.entity.Member;
import com.main.server.member.service.MemberService;
import com.main.server.playlist.dto.PlaylistCreateDto;
import com.main.server.playlist.dto.PlaylistResponseDto;
import com.main.server.playlist.dto.PlaylistSimpleDto;
import com.main.server.playlist.dto.PlaylistUpdateDto;
import com.main.server.playlist.entity.Playlist;
import com.main.server.playlist.service.PlaylistService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/playlists")
public class PlaylistController {

    private final MemberService memberService;
    private final PlaylistService playlistService;

    @PostMapping
    public ResponseEntity createPlaylist(@RequestBody @Valid PlaylistCreateDto dto,
                                         @AuthenticationPrincipal String email) {
        Playlist playlist = playlistService.createPlaylist(dto, email);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(PlaylistResponseDto.createByEntity(playlist));
    }

    @GetMapping("/{playlist-id}")
    public ResponseEntity getPlaylist(@PathVariable("playlist-id") @Positive Long playlistId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(PlaylistResponseDto.createByEntity(playlistService.findPlaylistById(playlistId)));
    }

    @GetMapping
    public ResponseEntity getPlaylists(@AuthenticationPrincipal String email) {
        Member findMember = memberService.findByEmail(email);
        List<PlaylistSimpleDto> responseDto = playlistService.findPlaylistsByMember(findMember).stream()
                .map(PlaylistSimpleDto::createByPlaylist)
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseDto(responseDto, 200));
    }

    @PatchMapping("/{playlist-id}")
    public ResponseEntity updatePlaylist(@PathVariable("playlist-id") @Positive Long playlistId,
                                         @RequestBody PlaylistUpdateDto dto) {
        Playlist playlist = playlistService.findPlaylistById(playlistId);
        playlistService.updatePlaylist(playlist, dto);
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
}
