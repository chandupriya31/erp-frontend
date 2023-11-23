import axios from '../../config/axios'
export const startAddProduct = (data) => {
   return async (dispatch) => {
      try {
         const response = await axios.post('/api/products', data, {
            headers: {
               'Content-Type': 'multipart/form-data',
               Authorization: localStorage.getItem('token')
            }
         })
         dispatch(addproduct(response.data))
      } catch (e) {
         dispatch(serverErrors(e.response.data.errors))
      }
   }
}
const serverErrors = (msg) => {
   return ({ type: 'SET_SERVER_ERRORS', payload: msg })
}
const addproduct = (product) => {
   return ({ type: 'ADD_PRODUCT', payload: product })
}