package com.main.server.board.entity;


import com.main.server.audit.Auditable;
import com.main.server.member.entity.Member;
import com.main.server.playlist.entity.Playlist;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
@Entity
@Getter
@NoArgsConstructor
@Data

public class Board extends Auditable {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long boardId;

        @Column(nullable = false)
        private String memberId;

        @Column(nullable = true)
        private String playlistId;

        @Column(length = 100,nullable = false)
        private String content;

        @Column(length = 100,nullable = false)
        private String title;

}
