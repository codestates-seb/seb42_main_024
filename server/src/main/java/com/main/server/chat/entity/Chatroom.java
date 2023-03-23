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

    /**
     * memberName에 해당하는 멤버를 리스트에 추가
     * @param memberName
     * @return
     */
    public Chatroom enterMember(String memberName) {
        if (!members.contains(memberName)) {
            List<String> membersEdit = new ArrayList<>(members);
            membersEdit.add(memberName);
            members = membersEdit;
        }
        return this;
    }

    /**
     * memberName에 해당하는 멤버를 리스트에서 제외.
     * @param memberName
     * @return
     */
    public Chatroom leaveMember(String memberName) {
        if (members.contains(memberName)) {
            List<String> membersEdit = new ArrayList<>(members);
            membersEdit.remove(memberName);
            members = membersEdit;
        }
        return this;
    }

    /**
     * memberName의 순번(방에 몇번째로 입장했는지)을 리턴.
     * 해당 값은 프론트에서 사용.
     * @param memberName
     * @return
     */
    public Integer getMemberNumber(String memberName) {
        if (members.contains(memberName)) {
            return members.indexOf(memberName);
        } else {
            return 0;
        }
    }
}
