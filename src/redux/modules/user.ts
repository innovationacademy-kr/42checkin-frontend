import { DEFAULT_PROFILE } from "../../utils/utils";

// actions
const LOGIN = "LOGIN" as const;
const LOGOUT = "LOGOUT" as const;
const SET_USER = "SET_USER" as const;
const SET_CARD_NUM = "SET_CARD_NUM" as const;

// action creators
export const login = () => {
  return {
    type: LOGIN,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const setUser = (user: User) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setCardNum = (cardNum: string) => {
  return {
    type: SET_CARD_NUM,
    payload: cardNum,
  };
};

// type
type UserActions =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof setUser>
  | ReturnType<typeof setCardNum>;

// initalState
const initalState: User = {
  isLogin: false,
  id: "",
  cardNum: "",
  status: "out",
  profile: DEFAULT_PROFILE,
};

// reducer
export const user = (state = initalState, action: UserActions) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    case SET_USER:
      return {
        ...state,
        id: action.payload.id,
        cardNum: action.payload.cardNum,
        status: action.payload.status,
        profile: action.payload.profile,
      };
    case SET_CARD_NUM:
      return {
        ...state,
        cardNum: action.payload,
      };
    default:
      return state;
  }
};
