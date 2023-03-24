package com.main.server.chat.repository;

import com.main.server.chat.entity.Chatroom;
import com.main.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom, Long>, ChatroomRepositoryCustom {

    Optional<Chatroom> findByMember(Member member);
}
