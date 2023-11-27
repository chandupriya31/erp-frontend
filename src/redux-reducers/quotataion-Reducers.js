
const initialState = { quotation: [], quserverErrors: [] }
export const quotationReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'ADD_QUOTATION': {
         return { ...state, quotation: [...state.quotation, action.payload] }
      }
      case 'SET_SERVER_ERRORS': {
         return { ...state, quserverErrors: action.payload }
      }
      case 'CLEAR': {
         return { ...state, quserverErrors: action.payload }
      }
      default: {
         return { ...state }
      }
   }
}