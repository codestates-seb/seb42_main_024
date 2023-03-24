package com.main.server.playlist.dto;

import com.main.server.song.dto.SongCreateDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistUpdateDto {
    private List<SongCreateDto> songList;
}
