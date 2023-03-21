package com.main.server.member.entity;
import com.main.server.audit.Auditable;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
 // 주석 = 바꿔야 할 부분
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 100, nullable = false, unique = true)
    private String nickname;
    // length

    @Column(length = 100, nullable = false, unique = true)
    private String email;
    // length

    @Column(length = 500)
    private String picture;

//    @Column(length = 1000, nullable = false)
//    private String password;
//    // length

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();



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


//팔로우 기능 추가
    @ManyToMany
    @JoinTable(name = "follow",
            joinColumns = @JoinColumn(name = "follower_id"),
            inverseJoinColumns = @JoinColumn(name = "following_id"))
    private List<Member> followings = new ArrayList<>();

    @ManyToMany(mappedBy = "followings")
    private List<Member> followers = new ArrayList<>();

    public void addFollowing(Member member) {
        this.followings.add(member);
        member.getFollowers().add(this);
    }

    public void removeFollowing(Member member) {
        this.followings.remove(member);
        member.getFollowers().remove(this);
    }


}
