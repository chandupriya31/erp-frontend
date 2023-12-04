const initialState = {
    enquiry: {},
    enquiryList: [],
    serverErrors: []
}

export const enquiryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ADD_ENQUIRY': {
            return { ...state, enquiry: {...state.enquiry, ...action.payload}}
        }
        case 'GET_ENQUIRIES':{
            return {...state,enquiryList:action.payload}
        }
        case 'SET_ERRORS': {
            return { ...state, serverErrors: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}