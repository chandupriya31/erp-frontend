import axios from "../config/axios"

export const startPayment = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/payment', formData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log(response.data)
            localStorage.setItem('transactionId', response.data.id)
            window.location = response.data.url
        } catch (e) {
            console.log(e)
        }
    }
}

export const startUpdatePayment = (id)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get(`/api/payment/update/${id}`,{
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })

        }catch(e){
            console.log(e)
        }
    } 
}


export const deletePayment = (id)=>{
    return async(dispatch)=>{
        try{
            const remove = await axios.delete(`/api/payment/${id}`,{
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            console.log('deleted payment',remove.data)
        }catch(e){
            console.log(e)
        }
    }
}