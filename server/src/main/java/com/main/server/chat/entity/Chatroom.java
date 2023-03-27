package com.main.server.chat.entity;

import com.main.server.audit.Auditable;
import com.main.server.chat.dto.ChatroomCreateDto;
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
public class Chatroom extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatroomId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String title;

    private String thumbnail;

    private Integer heat = 0;

    @CollectionTable(name = "chatroom_member",
            joinColumns = @JoinColumn(name = "chatroom_id"))
    @ElementCollection(fetch = FetchType.LAZY)
    List<String> members = new ArrayList<>();


    @Builder
    public Chatroom(Member member, String title, String thumbnail) {
        this.member = member;
        this.title = title;
        this.thumbnail = thumbnail;
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

    public void addHeat(Integer heat) {
        this.heat += heat;
    }
}
