import {
  TOGGLE_PLAY,
  TOGGLE_PAUSE,
  SET_PLAYLIST,
  TO_PREV_SONG,
  TO_NEXT_SONG,
  SET_AS_NEXT_SONG,
  SET_AS_LAST_SONG,
  FETCH_PREV_SONG,
  STORE_CURRENT_SONG,
} from "../actions/actions";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: true,
      };
    case TOGGLE_PAUSE:
      return {
        ...state,
        isPlaying: false,
      };
    case SET_PLAYLIST:
      return {
        ...state,
        currentSongIdx: 0,
        currentSongList: [...action.payload],
      };
    case TO_PREV_SONG:
      return {
        ...state,
        currentSongIdx: state.currentSongIdx - 1,
      };
    case TO_NEXT_SONG:
      return {
        ...state,
        currentSongIdx: state.currentSongIdx + 1,
      };
    case SET_AS_NEXT_SONG:
      return {
        ...state,
        currentSongList: [
          ...state.currentSongList.slice(0, state.currentSongIdx + 1),
          action.payload,
          ...state.currentSongList.slice(state.currentSongIdx + 1),
        ],
      };
    case SET_AS_LAST_SONG:
      return {
        ...state,
        currentSongList: [...state.currentSongList, action.payload],
      };
    case FETCH_PREV_SONG:
      return {
        ...state,
        currentSongIdx: state.prevSongIdx,
        prevSongIdx: null,
      };
    case STORE_CURRENT_SONG:
      return {
        ...state,
        prevSongIdx: state.currentSongIdx,
        currentSongIdx: null,
      };
    default:
      return state;
  }
};

export default reducer;
