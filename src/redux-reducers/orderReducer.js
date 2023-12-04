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
      case 'EDIT': {
         return {
            ...state, order: state.order.map((ele) => {
               if (ele._id === action.payload._id) {
                  return { ...ele, ...action.payload }
               } else {
                  return { ...ele }
               }
            })
         }
      }

      default: {
         return { ...state }
      }
   }
}