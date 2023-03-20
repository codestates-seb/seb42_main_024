package com.main.server.chat.entity;

import com.main.server.member.entity.Member;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Slf4j
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chatroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatroomId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String title;

    private Integer maxCount = 4;

    @CollectionTable(name = "chatroom_member",
            joinColumns = @JoinColumn(name = "chatroom_id"))
    @ElementCollection(fetch = FetchType.LAZY)
    List<String> members = new ArrayList<>();

    @Builder
    public Chatroom(Member member, String title) {
        this.member = member;
        this.title = title;
    }

    public Chatroom enterMember(String memberName) {
        if (!members.contains(memberName)) {
            List<String> membersEdit = new ArrayList<>(members);
            membersEdit.add(memberName);
            members = membersEdit;
        }
        return this;
    }

    public Chatroom leaveMember(String memberName) {
        if (members.contains(memberName)) {
            List<String> membersEdit = new ArrayList<>(members);
            membersEdit.remove(memberName);
            members = membersEdit;
        }
        return this;
    }

    public Integer getMemberNumber(String memberName) {
        if (members.contains(memberName)) {
            return members.indexOf(memberName);
        } else {
            return 0;
        }
    }
}
