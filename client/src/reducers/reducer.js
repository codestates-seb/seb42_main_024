import { initialState } from './initialState';

import { SET_CURRENT_SONG_URL } from '../actions/actions';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SONG_URL:
      return {
        ...state,
        currentSongURL: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
