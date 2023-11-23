import React from "react";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { UseSelector, useDispatch } from "react-redux";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from "../../config/axios";
export default function AddProduct() {
   const [productname, setProductName] = useState('')
   const [description, setDescription] = useState('')
   const [categories, setCategories] = useState([])
   const [categoryname, setCategoryName] = useState('')
   const [companyId, setCompanyId] = useState('')
   const [image, setImage] = useState([])
   const [categoryId, setCategoryId] = useState('')
   const [productWarrenty, setProductWarrenty] = useState('')
   const [paymentTerms, setPaymentTerms] = useState('')

   useEffect(() => {
      (async () => {
         try {
            const response = await axios.get('/api/categories/list')
            console.log(response.data)
            setCategories(response.data)
         } catch (e) {
            alert(e.message)
         }
      })()
   }, [])

   const handleAdd = async () => {
      if (categoryname) {
         const data = {
            name: categoryname
         }
         try {
            const response = await axios.post('/api/categories', data, {
               headers: {
                  'Authorization': localStorage.getItem('token')
               }
            })
            const category = response.data
            setCategories([...categories, category])
            setCategoryId(category._id)
            setCategoryName('')
         } catch (e) {
            console.log(e)
         }
      }
   }
   return (
      <div className="d-flex justify-content-center" style={{ marginBottom: '1000px' }}>
         <Form >
            <InputGroup style={{ width: '500px' }}>
               <Form.Group className="mb-3">
                  <Form.Label>Enter product name</Form.Label>
                  <Form.Control type="text" value={productname} onChange={(e) => setProductName(e.target.value)} />
                  <Form.Label>Product description</Form.Label>
                  <Form.Control as='textarea' value={description} onChange={(e) => setDescription(e.target.value)} />
                  <Form.Label>Select category</Form.Label>
                  <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                     <option value=''>Select</option>
                     {categories.map((ele) => (
                        <option key={ele._id} value={ele._id}>{ele.name}</option>
                     ))}
                  </Form.Select>
               </Form.Group>
               <InputGroup>
                  <Form.Control placeholder="Add category" value={categoryname} onChange={(e) => { setCategoryName(e.target.value) }} />
                  <Button variant="outline-secondary" onClick={handleAdd}>+</Button>
               </InputGroup>
            </InputGroup>
         </Form>
      </div>
   )
}