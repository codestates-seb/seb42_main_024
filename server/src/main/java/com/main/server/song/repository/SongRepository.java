package com.main.server.song.repository;
import com.main.server.song.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SongRepository extends JpaRepository<Song,Long> {


    Optional<Song> findBySongId(Long songId);
}
