// actions
const SET_CONFIG = 'SET_CONFIG';

// action creators
export const setConfig = data => {
  const { beginAt, endAt, seocho, gaepo } = data;
  return {
    type: SET_CONFIG,
    payload: {
      beginAt: beginAt,
      endAt: endAt,
      seocho: seocho,
      gaepo: gaepo
    }
  };
};

// initalState
const initalState = {
  beginAt: null,
  endAt: null,
  seocho: 0,
  gaepo: 0
};

// reducer
export const config = (state = initalState, action) => {
  switch (action.type) {
    case SET_CONFIG:
      return {
        ...state,
        beginAt: action.payload.beginAt,
        endAt: action.payload.endAt,
        seocho: action.payload.seocho,
        gaepo: action.payload.gaepo
      };
    default:
      return state;
  }
};
