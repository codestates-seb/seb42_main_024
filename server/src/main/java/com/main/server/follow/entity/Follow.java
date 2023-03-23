package com.main.server.follow.entity;

import com.main.server.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;
    @ManyToOne
    @JoinColumn(name = "Follower_ID")
    private Member follower; //로그인 한 사람

    @ManyToOne
    @JoinColumn(name = "target_ID")
    private Member target; //팔로우 당하는 사람

    public Follow(Member follower, Member target) {
        this.follower = follower;
        this.target = target;
    }
}