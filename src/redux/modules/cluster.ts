import { createAction, ActionType } from "typesafe-actions";

// actions
const SET_CLUSTER = "config/SET_CLUSTER";
const SET_CURRENT_USER_COUNT = "config/SET_CURRENT_USER_COUNT";
// action creators

export const setConfig = createAction(SET_CLUSTER)<Cluster>();
export const setCurrentUserCount = createAction(SET_CURRENT_USER_COUNT)<{ gaepo: number; seocho: number }>();

// type
const actions = { setConfig, setCurrentUserCount };
type ClusterActions = ActionType<typeof actions>;

// initalState
const initalState: Cluster = {
  openAt: "",
  closeAt: "",
  seocho: 0,
  gaepo: 0,
  seochoLimitation: 0,
  gaepoLimitation: 0,
};

// reducer
const clusterReducer = (state = initalState, action: ClusterActions): Cluster => {
  switch (action.type) {
    case SET_CLUSTER: {
      const { openAt, closeAt, gaepo, seocho, gaepoLimitation, seochoLimitation } = action.payload;
      return { ...state, openAt, closeAt, gaepoLimitation, seochoLimitation, gaepo, seocho };
    }
    case SET_CURRENT_USER_COUNT: {
      const { gaepo, seocho } = action.payload;
      return { ...state, gaepo, seocho };
    }
    default:
      return state;
  }
};

export default clusterReducer;
