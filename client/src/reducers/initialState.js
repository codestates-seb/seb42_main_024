export const initialState = {
  isPlaying: false,
  prevSongIdx: null,
  currentSongIdx: null,
  currentSongList: [
    {
      musicId: 1,
      musicTitle: 'OMG',
      musicUrl: 'https://www.youtube.com/watch?v=sVTy_wmn5SU',
      artist: 'NewJeans (뉴진스)',
      thumbnail:
        'https://i.ytimg.com/vi/sVTy_wmn5SU/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD25Ta04rjAxR1TTb4KrZyZo2UcYA',
    },
    {
      musicId: 2,
      musicTitle: 'ANTIFRAGILE',
      musicUrl: 'https://www.youtube.com/watch?v=qORaYudQ7Zc',
      artist: 'LE SSERAFIM(르세라핌)',
      thumbnail:
        'https://i.ytimg.com/vi/qORaYudQ7Zc/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBGVbnQuRNPCnHFQFbAW2Ohbutq4g',
    },
    {
      musicId: 3,
      musicTitle: 'Hype Boy',
      musicUrl: 'https://www.youtube.com/watch?v=11cta61wi0g',
      artist: 'NewJeans (뉴진스)',
      thumbnail:
        'https://i.ytimg.com/vi/11cta61wi0g/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAPtpCjFwMpnfhTXZeafyofa7w-ww',
    },
  ],
  liveroomSongIdx: null,
  liveroomSongList: [],
};
