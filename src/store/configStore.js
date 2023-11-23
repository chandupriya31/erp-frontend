import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { productReducer } from '../redux-reducers/product-reducers'

const configureStore = () => {
   const store = createStore(combineReducers({
      product: productReducer
   }), applyMiddleware(thunk))
   return store
}

export default configureStore