function userReducer(state, action) {
   switch (action.type) {
      case 'USER_LOGIN': {
         return { ...state, user: { ...state.user,...action.payload } }
      }
      default: {
         return { ...state }
      }

   }
}

export default userReducer