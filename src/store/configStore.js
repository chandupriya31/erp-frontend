import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { productReducer } from '../redux-reducers/product-reducers'
import { enquiryReducer } from '../redux-reducers/enquiryReducer'
import { quotationReducer } from '../redux-reducers/quotataion-Reducers'

const configureStore = () => {
   const store = createStore(combineReducers({
      product: productReducer,
      enquiries: enquiryReducer,
      quotation: quotationReducer
   }), applyMiddleware(thunk))
   return store
}

export default configureStore