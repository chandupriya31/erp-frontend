import axios from "../config/axios"

export const setAddEnquiry = ({ formData, navigate }) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/enquiry/create', formData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            dispatch(addEnquiry(response.data))
            navigate('/customer')
        } catch (e) {
            dispatch(setErrors(e.response.data.errors))
        }
    }
}

const addEnquiry = (formData) => {
    return { type: 'SET_ADD_ENQUIRY', payload: formData }
}


const setErrors = (err) => {
    return { type: 'SET_ERRORS', payload: err }
}

export const startGetEnquiries = ()=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get('/api/enquiries/list',{
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            dispatch(getEnquiries(response.data))
        }catch(e){
            // setErrors(e.response.data.errors)
            console.log(e)
        }
    }
}

const getEnquiries = (data)=>{
    return {type: 'GET_ENQUIRIES',payload:data}
}