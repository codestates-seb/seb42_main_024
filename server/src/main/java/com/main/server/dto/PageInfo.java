package com.main.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class PageInfo {
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
}
