const initialState = {
   order: [],
   serverErrors: []
}

export const orderReducer = (state = initialState, action) => {

   switch (action.type) {
      case 'SET_ORDER': {
         return { ...state, order: [...state.order, action.payload] }
      }
      case 'GET_ORDER': {
         return { ...state, order: action.payload }
      }
      default: {
         return { ...state }
      }
   }
}