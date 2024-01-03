
const initialState = { quotation: {}, list: [], quserverErrors: [] ,comment:{},commentsList:[]}

export const quotationReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'ADD_QUOTATION': {
         return { ...state, quotation: {...state.quotation, ...action.payload} }
      }
      case 'SET_SERVER_ERRORS': {
         return { ...state, quserverErrors: action.payload }
      }
      case 'SET_QUOTATION': {
         return { ...state, list: action.payload}
      }
      case 'START_GET_SORTED_DATA':{
         return {...state,list:action.payload}
      }
      case 'EDIT_QUOTE':{
         return {...state,quotation:{...state.quotation,...action.payload}}
      }
      case 'ADD_COMMENT':{
         return {...state,comment:{...state.comment,...action.payload}}
      }
      case 'GET_COMMENTS':{
         console.log(action.payload,'action')
         return {...state,commentsList:action.payload}
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