
const initialState = { quotation: [], List: [], quserverErrors: [] }

export const quotationReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'ADD_QUOTATION': {
         return { ...state, quotation: [...state.quotation, action.payload] }
      }
      case 'SET_SERVER_ERRORS': {
         return { ...state, quserverErrors: action.payload }
      }
      case 'SET_QUOTATION': {
         return { ...state, List: [...action.payload] }
      }
      case 'CLEAR': {
         return { ...state, quserverErrors: action.payload }
      }
      case 'QUOTATION_LOG_OUT': {
         console.log(action)
         return { ...state, quotation: [], List: [], quserverErrors: [] }
      }
      default: {
         return { ...state }
      }
   }
}