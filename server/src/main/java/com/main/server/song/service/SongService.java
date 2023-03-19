package com.main.server.song.service;

import com.main.server.song.entity.Song;
import com.main.server.song.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;
}
