package com.main.server.chat.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequestDto {

    private Long memberId;

    private String memberName;

    private String message;

    private Long chatroomId;

    public ChatResponseDto toResponseDto(Integer memberNumber) {
        return ChatResponseDto.builder()
                .message(message)
                .memberName(memberName)
                .chatroomId(chatroomId)
                .memberNumber(memberNumber)
                .build();
    }
}
