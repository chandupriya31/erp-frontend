import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { productReducer } from '../redux-reducers/product-reducers'
import { enquiryReducer } from '../redux-reducers/enquiryReducer'
import { quotationReducer } from '../redux-reducers/quotataion-Reducers'
import { orderReducer } from '../redux-reducers/orderReducer'
const configureStore = () => {
   const store = createStore(combineReducers({
      product: productReducer,
      enquiries: enquiryReducer,
      quotation: quotationReducer,
      order: orderReducer
   }), applyMiddleware(thunk))
   return store
}

export default configureStore