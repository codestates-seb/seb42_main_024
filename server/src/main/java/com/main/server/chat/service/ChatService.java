package com.main.server.chat.service;

import com.main.server.chat.dto.ChatRequestDto;
import com.main.server.chat.dto.ChatResponseDto;
import com.main.server.chat.entity.Chat;
import com.main.server.chat.entity.Chatroom;
import com.main.server.chat.repository.ChatRepository;
import com.main.server.chat.repository.ChatroomRepository;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.global.config.PropertyVariable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final SimpMessagingTemplate template;
    private final ChatRepository chatRepository;
    private final ChatroomRepository chatroomRepository;

    /**
     * 알맞는 Chatroom에 Member에 대한 nickname(프론트쪽에서 전달) 만 추가해줌.
     * 10명이 넘을경우 Error메세지를 방 전체에 호출,
     * 해당하는 nickname 유저는 프론트에서 알맞게 강퇴처리.
     * @param dto
     */
    public void enterMember(ChatRequestDto dto) {
        Chatroom chatroom = findChatroomById(dto.getChatroomId());

        if (chatroom.getMembers().size() < PropertyVariable.CHATROOM_MAX_SIZE) { // 인원이 max size 미만일경우 입장처리
            Integer memberNumber = chatroom // 해당 멤버가 몇번째 맴버인지 확인(프론트에서 컬러로 나누는데 쓰임)
                    .enterMember(dto.getMemberName())
                    .getMemberNumber(dto.getMemberName());

            dto.setMessage("< " + dto.getMemberName() + " > 님이 입장하셨습니다.");

            template.convertAndSend("/sub/chat/room/" + dto.getChatroomId(),
                    dto.toResponseDto(memberNumber).isEnterType());

            chatroom.addHeat(PropertyVariable.ADD_HEAT_AT_ENTER);
            chatroomRepository.save(chatroom);
        } else {
            template.convertAndSend("/sub/chat/room/" + dto.getChatroomId(),
                    dto.toResponseDto(null).isSystemType("Full"));
        }
    }

    /**
     * 받은 dto의 내용을 해당방을 구독하는 모두에게 전달.
     * 이후 채팅로그 DB에 저장 (아직 쓰임새 없음, 기능 제거 가능성 있음)
     * @param dto
     */
    public void sendMessage(ChatRequestDto dto) {
        Chatroom chatroom = findChatroomById(dto.getChatroomId());

        if (PropertyVariable.SAVE_CHAT) {
            Chat chat = Chat.builder() // DB에 채팅내역 저장
                    .memberId(dto.getMemberId())
                    .content(dto.getMessage())
                    .build();

            chatRepository.save(chat);
        }

        template.convertAndSend("/sub/chat/room/" + dto.getChatroomId(),
                dto.toResponseDto(chatroom.getMemberNumber(dto.getMemberName()))); // 멤버 순번 세팅
    }

    /**
     * 이벤트를 통해 해당 유저 퇴장처리.
     * @param event
     */
    public void leaveMember(SessionDisconnectEvent event) {
        //헤더에 접근해서 enterMember에서 set 해줬던 알맞는 헤더값을 가져옴.
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String memberName = (String)headerAccessor.getSessionAttributes().get("MemberName");
        Long chatroomId = (Long)headerAccessor.getSessionAttributes().get("roomId");

        log.info("{}", memberName);
        log.info("{}", chatroomId.toString());

        Chatroom chatroom = findChatroomById(chatroomId); // 채팅룸을 가져와
        Integer memberNumber = chatroom.getMemberNumber(memberName);
        chatroom.leaveMember(memberName); // 해당멤버 제외
        chatroomRepository.save(chatroom);

        log.info("headAccessor: {}", headerAccessor);

        String message = "< " + memberName + " > 님이 퇴장하셨습니다.";

        ChatResponseDto dto = ChatResponseDto.builder()
                .memberName(memberName)
                .chatroomId(chatroomId)
                .message(message)
                .memberNumber(memberNumber)
                .build()
                .isLeaveType();

        template.convertAndSend("/sub/chat/room/" + chatroomId, dto);
    }

    /**
     * chatroomId 의 방을 구독하고있는 사람들에게
     * System 타입의 ChatResponseDto를
     * message 에 해당하는 명령어를 실행하도록 전달.
     * @param chatroomId
     * @param message
     */
    public void sendSystemMessage(Long chatroomId, String message) {
        template.convertAndSend("/sub/chat/room/" + chatroomId, 
                ChatResponseDto.builder().build().isSystemType(message)); // 별로인듯
    }

    private Chatroom findChatroomById(Long chatroomId) {
        return chatroomRepository.findById(chatroomId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHATROOM_NOT_FOUND));
    }
}
