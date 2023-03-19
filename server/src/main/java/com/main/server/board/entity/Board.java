package com.main.server.board.entity;


import com.main.server.audit.Auditable;
import com.main.server.like.entity.Like;
import com.main.server.member.entity.Member;
import com.main.server.playlist.entity.Playlist;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter@Setter
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
        //length

        @OneToMany(fetch = FetchType.LAZY,mappedBy = "board", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
        private List<Like> likes = new ArrayList<>();

        public Like addLike(Like like) {
                List<Like> newLike = new ArrayList<>(likes);
                newLike.add(like);
                this.likes = newLike;
                return like;
        }


}
