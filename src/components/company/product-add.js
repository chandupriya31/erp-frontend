import React from "react";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { UseSelector, useDispatch } from "react-redux";
import InputGroup from 'react-bootstrap/InputGroup';
import { startAddProduct } from "../action/productactionCltr";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import axios from "../../config/axios";
export default function AddProduct() {
   const [productname, setProductName] = useState('')
   const [description, setDescription] = useState('')
   const [categories, setCategories] = useState([])
   const [categoryname, setCategoryName] = useState('')
   const [companyId, setCompanyId] = useState('')
   const [cost, setCost] = useState('')
   const [files, setFiles] = useState([])
   const [categoryId, setCategoryId] = useState('')
   const [productWarrenty, setProductWarrenty] = useState('')
   const [paymentTerms, setPaymentTerms] = useState('')

   const dispatch = useDispatch()

   function handleSubmit(e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('productname', productname)
      formData.append('description', description)
      formData.append('companyId', '655711893eba121f3032fa61')
      formData.append('perUnitCost', Number(cost))
      formData.append('categoryId', categoryId)
      formData.append('productWarranty', productWarrenty)
      formData.append('paymentTerms', paymentTerms)

      files.forEach((obj) => {
         formData.append('image', obj)
      })
      dispatch(startAddProduct(formData))
         .then(() => {
            // Reset form fields after successful submission
            setProductName('');
            setDescription('');
            setCategoryId('');
            setCost('');
            setFiles([]);
            setProductWarrenty('');
            setPaymentTerms('');
            setCategoryName('');
         })
         .catch((error) => {
            console.log(error);
            // Handle errors if necessary
         });
   }
   useEffect(() => {
      (async () => {
         try {
            const response = await axios.get('/api/categories/list')
            setCategories(response.data)
         } catch (e) {
            alert(e.message)
         }
      })()
   }, [])

   function handleFiles(e) {
      const upload = e.target.files
      setFiles(prevFiles => [...prevFiles, ...upload]);
   }
   console.log(files)
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
         <Card style={{ width: '900px', padding: '20px' }} className="mt-5">
            <Card.Header>
               <Card.Title>Add Product</Card.Title>
            </Card.Header>
            <Card.Body>
               <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <InputGroup style={{ width: '500px' }}>
                     <Form.Group className="mb-3">
                        <Form.Label>Enter product name</Form.Label>
                        <Form.Control type="text" value={productname} onChange={(e) => setProductName(e.target.value)} style={{ width: '500px' }} />
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
                        <Button variant="outline-secondary" onClick={handleAdd} type='button'>+</Button>
                     </InputGroup>
                  </InputGroup>
                  <Form.Label>cost per unit</Form.Label><br />
                  <Form.Control style={{ width: '500px' }} type='Number' value={cost} onChange={(e) => { setCost(e.target.value) }} />
                  <Form.Group controlId="formFileMultiple" className="mb-3" style={{ width: '500px' }}>
                     <Form.Label>upload product image</Form.Label>
                     <Form.Control type="file" name='image' value={undefined} onChange={handleFiles} multiple />
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>product Warrenty</Form.Label>
                     <Form.Control as='textarea' type="text" value={productWarrenty} onChange={(e) => { setProductWarrenty(e.target.value) }} />
                     <Form.Label>pymanet terms</Form.Label>
                     <Form.Control as='textarea' type="text" value={paymentTerms} onChange={(e) => { setPaymentTerms(e.target.value) }} />
                  </Form.Group>
                  <div variant="primary" type="submit" className="d-flex justify-content-center mt-5 ">
                     <Button style={{ width: '400px' }} type="submit">submit</Button>
                  </div>
               </Form>

            </Card.Body>
         </Card>
      </div>
   )
}