const defaultState = {
  symbols: [],
  loading: false,
  error: null,
}

const GET_SYMBOLS = "GET_SYMBOLS"


//action = {type: "", payload: ""}  action example
export const cryptoReducer = (state = defaultState, action) => {
  switch(action.type) {
    case GET_SYMBOLS:
      return {
        ...state,
        symbols: action.payload,
        loading: true,
        error: null
      }
    default:
      return state
  }
}


export const getSymbolsAction = (payload) => ({type: GET_SYMBOLS, payload})

