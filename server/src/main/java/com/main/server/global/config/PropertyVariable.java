package com.main.server.global.config;

import org.springframework.stereotype.Component;

@Component
public class PropertyVariable {

    public static final int PLAYLIST_MAX_SIZE = 20; // 플레이리스트 곡 최대 갯수
    public static final int PLAYLIST_CREATE_LIMIT = 20; // 플레이리스트 최대 생성갯수
    public static final int CHATROOM_MAX_SIZE = 10; // 챗룸 최대 인원수
    public static final int CHATROOM_CREATE_LIMIT = 50; // 챗룸 최대 생성갯수
    public static final int RANKING_CHATROOM_SIZE = 7;
    public static final int FIND_CHATROOM_MAX = 9; // 챗룸 리스트 조회요청시 응답 최대갯수
    public static final int ADD_HEAT_AT_ENTER = 2; // 입장했을 때 heat 증가값
    public static final int ADD_HEAT_AT_NEXTSONG = 5; // 노래가 바뀌었을 때 heat 증가값
}
