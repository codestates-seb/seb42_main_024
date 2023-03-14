package com.main.server.board.dto;

import com.main.server.board.entity.Board;
import com.main.server.member.entity.Member;
import com.main.server.playlist.entity.Playlist;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardRequestDto {
    private String title;
    private String content;
    private Member member; // mapper설정
    private Playlist playlist; // mapper설정

    public Board toEntity() {
        return Board.builder()
                .title(title)
                .content(content)
                .member(member)
                .playlist(playlist)
                .build();
    }
}
