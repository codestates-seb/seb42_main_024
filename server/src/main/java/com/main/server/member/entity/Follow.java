//package com.main.server.member.entity;
//
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.util.ArrayList;
//import java.util.List;
//
//@NoArgsConstructor
//@Getter
//@Setter
//@Entity
//public class Follow {
//
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Id
//    private Long followId;
//
////    @Column // 팔로우 버튼을 누르는 MemberId
////    private Long followerId;
////
////    @Column // 팔로우를 당하는 MemberId
////    private Long followingId;
////    @ManyToOne
////    @JoinColumn(name = "MEMBER_ID")
////    private Member member;
//
//    @OneToOne
//    private Member followMember;
//
//    @OneToOne
//    private Member followedMember;
//
//    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Follow> followings = new ArrayList<>();
//
//    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Follow> followers = new ArrayList<>();
//
//    public void addFollowing(Member member) {
//        Follow follow = new Follow(this, member);
//        this.followings.add(follow);
//        member.getFollowers().add(follow);
//    }
//
//    public void removeFollowing(Member member) {
//        Follow follow = new Follow(this, member);
//        this.followings.remove(follow);
//        member.getFollowers().remove(follow);
//    }
//}
