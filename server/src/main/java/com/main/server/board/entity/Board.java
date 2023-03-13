package com.main.server.board.entity;


import com.main.server.audit.Auditable;
import com.main.server.member.entity.Member;
import com.main.server.playlist.entity.Playlist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
@Entity
@Getter
@NoArgsConstructor

public class Board extends Auditable {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long boardId;

        @ManyToOne
        @JoinColumn(name = "MEMBER_ID")
        private Member member;
        // MEMBER_ID

        @ManyToOne
        @JoinColumn(name = "Playlist_ID")
        private Playlist playlist;
        // Board_ID

        @Column(length = 100,nullable = false)
        private String content;
        //length


        @Column(length = 100,nullable = false)
        private String title;
        //length


    }
