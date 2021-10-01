// actions
const SET_HEADCOUNT = 'SET_HEADCOUNT';

// action creators
export const setHeadCount = data => {
  const { seocho, gaepo } = data;
  return {
    type: SET_HEADCOUNT,
    payload: {
      seocho: seocho,
      gaepo: gaepo
    }
  };
};

// initalState
const initalState = {
  seocho: 0,
  gaepo: 0
};

// reducer
export const status = (state = initalState, action) => {
  switch (action.type) {
    case SET_HEADCOUNT:
      return {
        ...state,
        seocho: action.payload.seocho,
        gaepo: action.payload.gaepo
      };
    default:
      return state;
  }
};
