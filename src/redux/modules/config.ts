import { createAction, ActionType } from "typesafe-actions";

// actions
const SET_CONFIG = "config/SET_CONFIG";

// action creators

export const setConfig = createAction(SET_CONFIG)<Config>();

// type
const actions = { setConfig };
type ConfigActions = ActionType<typeof actions>;

// initalState
const initalState: Config = {
  openAt: "",
  closeAt: "",
  seocho: 0,
  gaepo: 0,
};

// reducer
const configReducer = (state = initalState, action: ConfigActions): Config => {
  switch (action.type) {
    case SET_CONFIG:
      return {
        ...state,
        openAt: action.payload.openAt,
        closeAt: action.payload.closeAt,
        seocho: action.payload.seocho,
        gaepo: action.payload.gaepo,
      };
    default:
      return state;
  }
};

export default configReducer;
