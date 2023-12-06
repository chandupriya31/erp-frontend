const initialState = { data: [], product:{}, serverErrors: [], categories: [], catpro: [] }

export const productReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'ADD_PRODUCT': {
         return { ...state, data: [...state.data, action.payload] }
      }
      case 'SET_PRODUCTS': {
         return { ...state, data: action.payload }
      }
      case 'SET_CATEGORY': {
         return { ...state, categories: action.payload }
      }
      case 'CAT_PRO': {
         return {
            ...state, catpro: action.payload}
      }
      case 'GET_PRODUCT':{
         return {...state,product:action.payload}
      }
      case 'SET_SERVER_ERRORS': {
         return { ...state, serverErrors: action.payload }
      }
      case 'DELETE_PRODUCT':{
         return {...state,data:state.data.filter(ele => ele._id !== action.payload._id)}
      }
      default: {
         return { ...state }
      }
   }
}