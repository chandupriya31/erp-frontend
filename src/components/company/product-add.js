import React from "react";
import { useState, useEffect } from "react";
import { UseSelector, useDispatch } from "react-redux";

export default function addProduct() {
   const [productname, setProductName] = useState('')
   const [description, setDescription] = useState('')
   const [categoryname, setCategoryName] = useState('')
   const [companyId, setCompanyId] = useState('')
   const [image, setImage] = useState([])
   const [categoryId, setCategoryId] = useState('')
   const [productWarrenty, setProductWarrenty] = useState('')
   const [paymentTerms, setPaymentTerms] = useState('')
   return (
      <div>
         <h1>add product</h1>
         <input type='text' />
      </div>
   )
}