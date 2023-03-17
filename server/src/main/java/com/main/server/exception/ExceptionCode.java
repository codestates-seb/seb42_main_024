package com.main.server.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(400, "member not found"),
    MEMBER_EXISTS(400, "member exists"),
    INVALID_TOKEN(400, "invalid token"),
    NO_PERMISSION(400, "no permission");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}