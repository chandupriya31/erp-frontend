import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { productReducer } from '../redux-reducers/product-reducers'
import { enquiryReducer } from '../redux-reducers/enquiryReducer'

const configureStore = () => {
   const store = createStore(combineReducers({
      product: productReducer,
      enquiries: enquiryReducer
   }), applyMiddleware(thunk))
   return store
}

export default configureStore