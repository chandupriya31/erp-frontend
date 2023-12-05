
const initialState = { quotation: {}, list: [], quserverErrors: [] }

export const quotationReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'ADD_QUOTATION': {
         return { ...state, quotation: {...state.quotation, ...action.payload} }
      }
      case 'SET_SERVER_ERRORS': {
         return { ...state, quserverErrors: action.payload }
      }
      case 'SET_QUOTATION': {
         console.log(action.payload,'action')
         return { ...state, list: action.payload}
      }
      case 'CLEAR': {
         return { ...state, quserverErrors: action.payload }
      }
      case 'QUOTATION_LOG_OUT': {
         console.log(action)
         return { ...state, quotation: {}, list: [], quserverErrors: [] }
      }
      default: {
         return { ...state }
      }
   }
}