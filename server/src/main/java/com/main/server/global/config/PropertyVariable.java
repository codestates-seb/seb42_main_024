package com.main.server.global.config;

import org.springframework.stereotype.Component;

@Component
public class PropertyVariable {

    public static final int PLAYLIST_MAX_SIZE = 20; // 플레이리스트 곡 최대 갯수
    public static final int CHATROOM_MAX_SIZE = 10; // 방 최대 인원수
    public static final int CHATROOM_CREATE_LIMIT = 50; // 방 생성개수 제한
}
