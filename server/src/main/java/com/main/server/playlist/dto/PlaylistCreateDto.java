package com.main.server.playlist.dto;

import com.main.server.song.dto.SongCreateDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistCreateDto {

    @NotBlank(message = "제목을 넣어주세요.")
    @Size(min = 3, max = 50 ,message = "제목의 길이는 3이상 50이하여야 합니다.")
    private String title;

    @NotBlank
    private List<SongCreateDto> songList;
}
