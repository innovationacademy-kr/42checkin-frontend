// actions
const SET_CONFIG = 'SET_CONFIG';

// action creators
export const setConfig = data => {
  const { openAt, closeAt, seocho, gaepo } = data;
  return {
    type: SET_CONFIG,
    payload: {
      openAt: openAt,
      closeAt: closeAt,
      seocho: seocho,
      gaepo: gaepo
    }
  };
};

// initalState
const initalState = {
  openAt: null,
  closeAt: null,
  seocho: 0,
  gaepo: 0
};

// reducer
export const config = (state = initalState, action) => {
  switch (action.type) {
    case SET_CONFIG:
      return {
        ...state,
        openAt: action.payload.openAt,
        closeAt: action.payload.closeAt,
        seocho: action.payload.seocho,
        gaepo: action.payload.gaepo
      };
    default:
      return state;
  }
};
