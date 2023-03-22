package com.main.server.playlist.dto;

import com.main.server.song.dto.SongCreateDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistCreateDto {

    private String title;

    private String thumbnail;

    private List<SongCreateDto> songList;
}
