// action type
export const SET_CURRENT_SONG_URL = "SET_CURRENT_SONG_URL";

// action controller
export const setCurrentSongURL = (url) => {
  return {
    type: SET_CURRENT_SONG_URL,
    payload: url,
  };
};
