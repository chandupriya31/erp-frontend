import axios from "../../config/axios"

export const setAddEnquiry = ({formData,navigate})=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post('/api/enquiry/create',formData)
            dispatch(addEnquiry(response.data))
            navigate('/customer')
        }catch(e){
            dispatch(setErrors(e.response.data.errors))
        }
    }
}

const addEnquiry = (formData)=>{
    return {type:'SET_ADD_ENQUIRY',payload:formData}
}

const setErrors = (err)=>{
    return {type:'SET_ERRORS',payload:err}
}