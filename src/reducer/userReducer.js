function userReducer(state, action) {
   switch (action.type) {
      case 'USER_LOGIN': {
         return { ...state, user: { ...state.user, ...action.payload } }
      }
      case 'USER_COMPANY': {
         return { ...state, company: { ...state.company, ...action.payload } }
      }
      case 'LOGOUT_USER': {
         return { ...state, user: {} }
      }
      default: {
         return { ...state }
      }

   }
}

export default userReducer