function userReducer(state, action) {
   switch (action.type) {
      case 'LOGIN_USER': {
         return { ...state, user: action.payload }
      }
      case 'COMPANY': {
         return { ...state, company: action.payload }
      }
      default: {
         return { ...state }
      }

   }
}

export default userReducer