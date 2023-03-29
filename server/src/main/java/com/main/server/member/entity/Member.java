package com.main.server.member.entity;
import com.main.server.audit.Auditable;
import com.main.server.follow.entity.Follow;
import com.main.server.like.entity.Like;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String nickname;

    private String picture;

    @CollectionTable(name = "member_role",
            joinColumns = @JoinColumn(name = "member_id"))
    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> roles = new ArrayList<>();

    @Column(nullable = false)
    private Integer playlistCount = 0;

    @Column(nullable = false)
    private Integer followersCount = 0;

    @Column(nullable = false)
    private Integer followingsCount = 0;


    @Builder
    public Member( String nickname,
                   String email,
                   String picture,
                   List<String> roles) {
        this.nickname = nickname;
        this.email = email;
        this.picture = picture;
        this.roles = roles;
    }

    public void playlistCountUp() {
        this.playlistCount++;
    }
}





