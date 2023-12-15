import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGetProduct } from "../actions/productactionCltr";
import AllProducts from "./products-categories/All-products";
export default function Productcar() {
   const dispatch = useDispatch()
   const product = useSelector((state) => {
      return state.product.data
   })
   console.log(product, 'home')

   useEffect(() => {
      dispatch(startGetProduct())
   }, [])

   return (
      <div>
         <h1>Products</h1>
         <AllProducts/>
      </div>
   )
}