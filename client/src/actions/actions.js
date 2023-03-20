// action types
export const TOGGLE_PLAY = 'TOGGLE_PLAY]';
export const TOGGLE_PAUSE = 'TOGGLE_PAUSE';
export const SET_PLAYLIST = 'SET_PLAYLIST';
export const TO_PREV_SONG = 'SET_PREV_SONG';
export const TO_NEXT_SONG = 'SET_NEXT_SONG';
export const SET_AS_NEXT_SONG = 'SET_AS_NEXT_SONG';
export const SET_AS_LAST_SONG = 'SET_AS_LAST_SONG';
export const FETCH_PREV_SONG = 'SET_IDX_PREV';
export const STORE_CURRENT_SONG = 'SET_PREV_IDX_CURRENT';

// action controllers
export const togglePlay = () => {
  return {
    type: TOGGLE_PLAY,
  };
};

export const togglePause = () => {
  return {
    type: TOGGLE_PAUSE,
  };
};

export const setPlaylist = (playlist) => {
  return {
    type: SET_PLAYLIST,
    payload: playlist,
  };
};

export const toPrevSong = () => {
  return {
    type: TO_PREV_SONG,
  };
};

export const toNextSong = () => {
  return {
    type: TO_NEXT_SONG,
  };
};

export const setAsNextSong = (song) => {
  return {
    type: SET_AS_NEXT_SONG,
    payload: song,
  };
};

export const setAsLastSong = (song) => {
  return {
    type: SET_AS_LAST_SONG,
    payload: song,
  };
};

export const fetchPrevSong = () => {
  return {
    type: FETCH_PREV_SONG,
  };
};

export const storeCurrentSong = () => {
  return {
    type: STORE_CURRENT_SONG,
  };
};
