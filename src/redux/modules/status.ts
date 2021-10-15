// actions
const SET_HEADCOUNT = 'SET_HEADCOUNT' as const

// action creators
export const setHeadCount = (data: Status) => {
  const { seocho, gaepo } = data
  return {
    type: SET_HEADCOUNT,
    payload: {
      seocho,
      gaepo,
    },
  }
}

// type

type StatusActions = ReturnType<typeof setHeadCount>

// initalState
const initalState: Status = {
  seocho: 0,
  gaepo: 0,
}

// reducer
export const status = (state = initalState, action: StatusActions): Status => {
  switch (action.type) {
    case SET_HEADCOUNT:
      return {
        ...state,
        seocho: action.payload.seocho,
        gaepo: action.payload.gaepo,
      }
    default:
      return state
  }
}
