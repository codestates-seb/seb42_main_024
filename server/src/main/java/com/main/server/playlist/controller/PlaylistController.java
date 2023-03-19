package com.main.server.playlist.controller;

import com.main.server.playlist.dto.PlaylistCreateDto;
import com.main.server.playlist.dto.PlaylistResponseDto;
import com.main.server.playlist.entity.Playlist;
import com.main.server.playlist.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/playlists")
public class PlaylistController {

    private final PlaylistService playlistService;

    @PostMapping
    public ResponseEntity createPlaylist(@RequestBody PlaylistCreateDto dto, @AuthenticationPrincipal String email) {
        Playlist playlist = playlistService.createPlaylist(dto, email);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(PlaylistResponseDto.createByEntity(playlist));
    }

    @GetMapping("/{playlist-id}")
    public ResponseEntity getPlaylist(@PathVariable("playlist-id") Long playlistId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(PlaylistResponseDto.createByEntity(playlistService.findPlaylistById(playlistId)));
    }
}
