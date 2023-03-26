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
export const SET_CURRENT_SONG_INDEX = 'SET_CURRENT_SONG_INDEX';
export const DELETE_SONG = 'DELETE_SONG';
export const TO_THE_TOP = 'TO_THE_TOP';
export const TO_THE_FRONT = 'TO_THE_FRONT';
export const SET_USER_DATA = 'SET_USER_DATA';
export const DELETE_USER_DATA = 'DELETE_USER_DATA';

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
export const setCurrentSongIdx = (index) => {
  return {
    type: SET_CURRENT_SONG_INDEX,
    payload: index,
  };
};
export const deleteSong = (songId) => {
  return {
    type: DELETE_SONG,
    payload: songId,
  };
};
export const toTheTop = () => {
  return {
    type: TO_THE_TOP,
  };
};
export const toTheFront = () => {
  return {
    type: TO_THE_FRONT,
  };
};
export const setUserData = (userData) => {
  return {
    type: SET_USER_DATA,
    payload: userData,
  };
};
export const deleteUserData = () => {
  return {
    type: DELETE_USER_DATA,
  };
};
