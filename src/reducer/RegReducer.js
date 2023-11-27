function regReducer(state, action) {
    switch (action.type) {
        case 'REGISTER': {
            return { ...state, reg: { ...state.type, ...action.payload } }
        }
        default: {
            return { ...state }
        }
    }
}

export default regReducer