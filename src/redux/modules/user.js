import { DEFAULT_PROFILE } from '../../utils/utils';

// actions
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_USER = 'SET_USER';
const SET_CARDNUM = 'SET_CARDNUM';

// action creators
export const login = () => {
  return {
    type: LOGIN
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const setCardNum = cardNum => {
  return {
    type: SET_CARDNUM,
    payload: cardNum
  };
};

// initalState
const initalState = {
  isLogin: false,
  id: '',
  cardNum: '',
  status: 'out',
  profile: DEFAULT_PROFILE
};

// reducer
export const user = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false
      };
    case SET_USER:
      return {
        ...state,
        id: action.payload.id,
        cardNum: action.payload.cardNum,
        status: action.payload.status,
        profile: action.payload.profile
      };
    case SET_CARDNUM:
      return {
        ...state,
        cardNum: action.payload
      };
    default:
      return state;
  }
};
