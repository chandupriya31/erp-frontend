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