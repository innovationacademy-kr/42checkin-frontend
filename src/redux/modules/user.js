// actions
const SET_USER = 'SET_USER';
const SET_CARDNUM = 'SET_CARDNUM';

// action creators
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
  id: '',
  cardNum: '',
  status: 'out'
};

// reducer
export const user = (state = initalState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        id: action.payload.id,
        cardNum: action.payload.cardNum,
        status: action.payload.cardNum ? 'in' : 'out'
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
