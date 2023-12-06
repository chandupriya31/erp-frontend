import axios from "../config/axios"
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
export const startGetProduct = () => {
   return async (dispatch) => {
      try {
         const response = await axios.get('/api/products/list')
         dispatch(setProducts(response.data))
         console.log(response.data)
      } catch (e) {
         console.log(e)
      }
   }
}
// export const clearserverError = ([]) => {
//    return ({ type: 'CLEAR_ERROR', payload: [] })
// }
const setProducts = (data) => {
   return ({ type: 'SET_PRODUCTS', payload: data })
}
export const startGetCategory = () => {
   return async (dispatch) => {
      try {
         const response = await axios.get('/api/categories/list')
         dispatch(setcategory(response.data))
      } catch (e) {
         console.log(e)
      }

   }
}

const setcategory = (data) => {
   return ({ type: 'SET_CATEGORY', payload: data })
}

export const startGetCatProduct = (id) => {
   return async (dispatch) => {
      try {
         const response = await axios.get(`/api/${id}/products`)
         console.log(response.data)
         dispatch(catpro(response.data))
      } catch (e) {
         console.log(e);
      }
   }
}
export const getIndividualProduct = (id)=>{
   return async(dispatch) =>{
      try {
         const response = await axios.get(`/api/productdetails/${id}`)
         dispatch(getProduct(response.data))
         // console.log(response.data,'response')
      }catch(e){
         console.log(e)
      }
   }
}

const catpro = (data) => {
   return ({ type: 'CAT_PRO', payload: data })
}
const getProduct = (data)=>{
   return {type: 'GET_PRODUCT',payload:data}
}

export const startDeleteProduct =(id)=>{
   return async(dispatch)=>{
      const response = await axios.delete(`api/products/${id}`,{
         headers:{
            'Authorization':localStorage.getItem('token')
         }
      })
      dispatch(deleteProduct(response.data))
   }
}

const deleteProduct = data =>{
   return {type:'DELETE_PRODUCT',payload:data}
}