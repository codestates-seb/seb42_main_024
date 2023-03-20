package com.main.server.board.entity;


import com.main.server.audit.Auditable;
import com.main.server.member.entity.Member;
import com.main.server.playlist.entity.Playlist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
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
        // PLAYLIST_ID


        @Column(length = 100,nullable = false)
        private String boardTitle;
        //제목

        @Column(length = 100,nullable = false)
        private String boardContent;
        //내용



        private LocalDateTime createdAt;
        //작성시각

        private LocalDateTime modifiedAt;
        //수정시각

        private Long viewCount = 0L;
        //조회수

        private Long likeCount = 0L;

        private Long groupId;



}