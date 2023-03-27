package com.main.server.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(400, "member not found"),
    BOARD_NOT_FOUND(400, "board not found"),
    LIKE_NOT_FOUND(400, "like not found"),
    ALREADY_LIKED(400, "board not found"),
    MEMBER_EXISTS(400, "member exists"),
    INVALID_TOKEN(400, "invalid token"),
    NO_PERMISSION(400, "no permission"),
    PLAYLIST_NOT_FOUND(400, "playlist not found"),
    PLAYLIST_FULL(400, "playlist full"),
    CHATROOM_ALREADY_EXISTS(400, "chatroom already exists"),
    CHATROOM_NOT_FOUND(400, "chatroom not found"),
    CHATROOM_FULL(400, "chatroom full"),
    NO_SONG(400, "no song left"),
    FULL_SONG(400, "song is full"),
    NOT_ALLOWED(400, "Not Allowed");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}