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
         console.log(response.data)
      } catch (e) {
         console.log(e) 
      }
   }
}

const addproduct = (product) => {
   return ({ type: 'ADD_PRODUCT', payload: product })
}