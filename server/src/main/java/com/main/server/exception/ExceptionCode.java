package com.main.server.exception;

import lombok.Getter;

public enum ExceptionCode {

    USER_NOT_FOUND(400, "user not found"),
    USER_EXISTS(400, "user exists"),
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