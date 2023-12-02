import axios from "../config/axios"
export const startGetorder = (formData) => {
   return async (dispatch) => {
      try {
         const response = await axios.post('/api/orders/create', formData, {
            headers: {
               'Authorization': localStorage.getItem('token')
            }
         })
         dispatch(addorder(response.data))
         console.log(response.data)
      } catch (e) {
         console.log(e)
      }
   }
}
export const getOrderList = () => {
   return async (dispatch) => {
      try {
         const response = await axios.get('/api/orders/list', {
            headers: {
               Authorization: localStorage.getItem('token')
            }
         })
         dispatch(getorder(response.data))
         console.log(response.data, 'list')
      } catch (e) {
         console.log(e)
      }
   }
}
const getorder = (data) => {
   return { type: 'GET_ORDER', payload: data }
}
const addorder = (data) => {
   return ({ type: 'SET_ORDER', payload: data })
}