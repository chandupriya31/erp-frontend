const initialState = { data: [], serverErrors: [] }

export const productReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'ADD_PRODUCT': {
         return { ...state, data: [...state.data, action.payload] }
      }
      case 'SET_SERVER_ERRORS': {
         return { ...state, serverErrors: action.payload }
      }
      default: {
         return { ...state }
      }
   }
}