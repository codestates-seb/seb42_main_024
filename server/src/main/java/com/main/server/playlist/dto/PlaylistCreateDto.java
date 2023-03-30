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

    @Size(min = 3, max = 50 ,message = "제목의 길이는 3이상 50이하여야 합니다.")
    @Pattern(regexp = "^[ㄱ-ㅎ|ㅏ-ㅣ|가-핳|a-z|A-Z|0-9]+$", message = "한글, 숫자, 알파벳만 사용 가능합니다.")
    private String title;

    @NotBlank
    private List<SongCreateDto> songList;
}
