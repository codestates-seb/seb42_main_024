package com.main.server.song.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SongCreateDto {

    @NotBlank(message = "영상을 추가하세요.")
    private String videoId;
    private String title;
    private String thumbnail;
}
