import { createAction, ActionType } from "typesafe-actions";

// actions
const SET_HEADCOUNT = "status/SET_HEADCOUNT";

// action creators
const setHeadCount = createAction(SET_HEADCOUNT)<Status>();

// type
const actions = { setHeadCount };
type StatusActions = ActionType<typeof actions>;

// initalState
const initalState: Status = {
  seocho: 0,
  gaepo: 0,
};

// reducer
const statusReducer = (state = initalState, action: StatusActions): Status => {
  switch (action.type) {
    case SET_HEADCOUNT:
      return {
        ...state,
        seocho: action.payload.seocho,
        gaepo: action.payload.gaepo,
      };
    default:
      return state;
  }
};

export default statusReducer;
