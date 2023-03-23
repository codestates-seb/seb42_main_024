package com.main.server.chat.data;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.global.config.PropertyVariable;
import com.main.server.playlist.entity.Playlist;
import com.main.server.playlist.service.PlaylistService;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class ChatSongQueue {

    @Setter(value = AccessLevel.PRIVATE)
    private List<ChatSong> songList = new ArrayList<>(); // 노래가 저장 (최대 30곡)

    private List<ChatSong> pastSong = new ArrayList<>(); // 지난 노래를 저장, 프론트에 정보표기용으로 사용 (2곡)

    private ChatSong nowSong; // 현재 재생중인 노래

    private LocalDateTime playedAt = LocalDateTime.now(); // 현재 재생중인 노래가 세팅된 시간

    /**
     * 노래를 추가하는 메서드입니다.
     * @param song
     */
    public void addSong(ChatSong song) {
        if (songList.size() >= PropertyVariable.PLAYLIST_MAX_SIZE) { // MAX_SIZE 보다 넘게 추가하려 하면 FULL_SONG 익셉션을 터트립니다.
            throw new BusinessLogicException(ExceptionCode.FULL_SONG);
        }
        songList.add(song);
    }

    /**
     * Playlist 엔티티 객체를 통해 노래 리스트를 받아 ChatRommQueue를 생성하는 메서드입니다.
     * 이후 노래추가는 Playlist 객채로는 추가하지 못하고 addSong 메서드를 통해
     * 단건으로 하나씩만 추가가 가능합니다.
     * @param playlist
     */
    public static ChatSongQueue createByPlaylist(Playlist playlist) {
        ChatSongQueue queue = new ChatSongQueue(); // 생성

        queue.songList.addAll(playlist.getSongs().stream() // Playlist 노래 전체 추가
                .map(ChatSong::createBySong)
                .collect(Collectors.toList()));

        queue.nowSong = queue.songList.remove(0); // 추가된 노래 중 첫번째를 nowSong으로 설정
        queue.playedAt = LocalDateTime.now(); // 시간 설정

        return queue;
    }

    /**
     * 다음 노래를 세팅하는 메서드입니다.
     * 들었던 노래를 컨트롤러에서 dto로 받고 세팅된 노래와 일치하면, (nowSong이 비어있을경우)
     * 해당 노래를 pastSong에 밀어넣고 새로운 노래를 세팅합니다.
     * 이후 기능동작여부를 boolean값으로 리턴하고,
     * 해당 boolean값은 SYSTEM메세지를 한번만 호출하도록 제한하는 역할에 쓰입니다.
     * @param dto
     * @return
     */
    public boolean nextSong(ChatSong dto) {
        String videoId = this.nowSong != null ? this.nowSong.getVideoId() : ""; // nowSong이 있는지 검사
        
        if (dto.getVideoId().equals(videoId) || this.nowSong == null) { // videoId가 같을경우(또는 비어있을때)에 한해 한번만 실행(프론트에서 중복요청에 대한 변경을 1회만 보장)
            updatePastSong();
            updateNowSong();
            this.playedAt = LocalDateTime.now();
            return true;
        }
        return false;
    }

    /**
     * 경과 시간을 초단위로 반환합니다.
     * @return
     */
    public Long getElapsedTime() {
        return Duration.between(this.playedAt, LocalDateTime.now()).getSeconds();
    }

    private void updatePastSong() {
        if (this.nowSong != null) { // nowSong이 있을경우에만 해당 곡을 pastSong에 추가
            if (this.pastSong.size() >= 2) { // size가 2 이상일경우 앞의 한곡 제거
                this.pastSong.remove(0);
            }
            this.pastSong.add(this.nowSong);
        }
    }

    private void updateNowSong() {
        if (songList.size() > 0) { // songList에 곡이 남아있을경우 (안남아있으면 마지막곡 반복재생)
            this.nowSong = songList.remove(0);
        }
    }
}
