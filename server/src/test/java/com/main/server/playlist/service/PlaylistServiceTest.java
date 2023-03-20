// package com.main.server.playlist.service;

// import com.main.server.member.entity.Member;
// import com.main.server.member.repository.MemberRepository;
// import com.main.server.playlist.dto.PlaylistCreateDto;
// import com.main.server.playlist.entity.Playlist;
// import com.main.server.playlist.repository.PlaylistRepository;
// import com.main.server.song.dto.SongCreateDto;
// import com.main.server.song.entity.Song;
// import com.main.server.song.repository.SongRepository;
// import org.assertj.core.api.Assertions;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.transaction.annotation.Transactional;

// import javax.persistence.EntityManager;
// import java.util.List;
// import java.util.stream.Collectors;
// import java.util.stream.IntStream;

// import static org.assertj.core.api.Assertions.*;
// import static org.junit.jupiter.api.Assertions.*;

// @Transactional
// @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
// class PlaylistServiceTest {

//     @Autowired
//     PlaylistService playlistService;

//     @Autowired
//     MemberRepository memberRepository;

//     @Autowired
//     PlaylistRepository playlistRepository;

//     @Autowired
//     SongRepository songRepository;

//     @Autowired
//     EntityManager em;

//     @Test
//     @DisplayName("플레이리스트 생성이 성공적으로 이루어져야 합니다.")
//     public void createPlaylistSuccess() throws Exception {
//         //given
//         Member member = Member.builder()
//                 .nickname("tester")
//                 .email("tester@test.com")
//                 .build();

//         memberRepository.save(member);

//         PlaylistCreateDto dto = new PlaylistCreateDto("foo", null,
//                 IntStream.range(1, 11)
//                         .mapToObj(i -> new SongCreateDto("video" + i, "title" + i, "thumb" + i))
//                         .collect(Collectors.toList()));

//         //when
//         Playlist playlist = playlistService.createPlaylist(dto, member.getEmail());

//         //then
//         assertThat(playlistRepository.count()).isEqualTo(1);
//         assertThat(songRepository.count()).isEqualTo(10);
//     }

//     @Test
//     @DisplayName("플레이리스트 ID 조회가 성공적으로 이루어져야 합니다.")
//     public void findPlaylistSuccess() throws Exception {
//         //given
//         Member member = memberRepository.save(Member.builder()
//                 .nickname("tester")
//                 .email("tester@test.com")
//                 .build());

//         PlaylistCreateDto dto = new PlaylistCreateDto("foo", null, null);

//         List<Song> songList = IntStream.range(1, 11)
//                 .mapToObj(i -> new SongCreateDto("video" + i, "title" + i, "thumb" + i))
//                 .map(Song::createByDto)
//                 .collect(Collectors.toList());

//         Playlist playlist = Playlist
//                 .createByDto(dto, member)
//                 .addSongs(songList);

//         playlistRepository.save(playlist);

//         //when
//         Playlist findPlaylist = playlistService.findPlaylistById(playlist.getPlaylistId());

//         em.flush();
//         em.clear();

//         //then
//         assertThat(playlist.getPlaylistId()).isEqualTo(findPlaylist.getPlaylistId());
//         assertThat(playlist.getMember().getEmail()).isEqualTo(findPlaylist.getMember().getEmail());
//         assertThat(playlist.getTitle()).isEqualTo(findPlaylist.getTitle());
//         assertThat(playlist.getSongs().size()).isEqualTo(findPlaylist.getSongs().size());
//         assertThat(playlist.getSongs().get(0).getTitle()).isEqualTo(findPlaylist.getSongs().get(0).getTitle());
//     }
// }
