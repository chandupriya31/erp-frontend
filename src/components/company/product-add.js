import React from "react"
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import InputGroup from 'react-bootstrap/InputGroup'
import { startAddProduct } from "../action/productactionCltr"
import { useContext } from "react"
import { UserContext } from "../../App"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import axios from "../../config/axios"
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
export default function AddProduct() {
   const [productname, setProductName] = useState('')
   const [description, setDescription] = useState('')
   const [categories, setCategories] = useState([])
   const [categoryname, setCategoryName] = useState('')
   //const [companyId, setCompanyId] = useState('')
   const [cost, setCost] = useState('')
   const [files, setFiles] = useState([])
   const [categoryId, setCategoryId] = useState('')
   const [productWarrenty, setProductWarrenty] = useState('')
   const [paymentTerms, setPaymentTerms] = useState('')
   const [formerrors, setFormErrors] = useState({})
   const [showToast, setShowToast] = useState(true)
   const errors = {}
   const { userState } = useContext(UserContext)
   const dispatch = useDispatch()

   const companyId = userState.company._id


   const handleClose = () => {
      setShowToast(false) // Set the state to hide the toast when the close button is clicked
   }

   const serverErrors = useSelector((state) => {
      return state.product.serverErrors
   })

   function runValidation() {
      if (productname.length == 0) {
         errors.productname = "*productname required"
      }
      if (description.length == 0) {
         errors.description = "*description required"
      }
      if (categoryId.length == 0) {
         errors.categoryId = " *caterogy required"
      }
      if (cost.length == 0) {
         errors.cost = '*per unit cost required'
      }
      if (files.length == 0) {
         errors.files = '*upload images'
      }
      if (productWarrenty.length == 0) {
         errors.productWarrenty = '*required warrenty of product'
      }
      if (paymentTerms.length == 0) {
         errors.paymentTerms = '*payment terms requires'
      }
      return errors
   }
   function handleSubmit(e) {
      e.preventDefault()
      runValidation()
      if (Object.keys(errors).length == 0) {
         const formData = new FormData()
         formData.append('productname', productname)
         formData.append('description', description)
         formData.append('companyId', companyId)
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
               setProductName('')
               setDescription('')
               setCategoryId('')
               setCost('')
               setFiles([])
               setProductWarrenty('')
               setPaymentTerms('')
               setCategoryName('')
               setFormErrors({})
            })
      } else {
         setFormErrors(errors)
      }
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
      setFiles(prevFiles => [...prevFiles, ...upload])
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
                        {formerrors.productname && (
                           <span className="red" style={{ position: 'absolute', top: 10, right: 0 }}>{formerrors.productname}</span>
                        )}
                        <Form.Label>Product description</Form.Label>
                        <Form.Control as='textarea' value={description} onChange={(e) => setDescription(e.target.value)} />
                        {formerrors.description && (
                           <span className="red" style={{ position: 'absolute', top: 80, right: 0 }}>{formerrors.description}</span>
                        )}
                        <Form.Label>Select category</Form.Label>
                        <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                           <option value=''>Select</option>
                           {categories.map((ele) => (
                              <option key={ele._id} value={ele._id}>{ele.name}</option>
                           ))}
                        </Form.Select>
                        {formerrors.categoryId && (
                           <span className="red" style={{ position: 'absolute', top: 170, right: 0 }}>{formerrors.categoryId}</span>
                        )}
                     </Form.Group>
                     <InputGroup>
                        <Form.Control placeholder="Add category" value={categoryname} onChange={(e) => { setCategoryName(e.target.value) }} />
                        <Button variant="outline-secondary" onClick={handleAdd} type='button'>+</Button>
                     </InputGroup>
                  </InputGroup>
                  <Form.Label>cost per unit</Form.Label><br />
                  <Form.Control style={{ width: '500px' }} type='Number' value={cost} onChange={(e) => { setCost(e.target.value) }} />
                  {formerrors.cost && (
                     <span className="red" style={{ position: 'absolute', top: 380, right: 360 }}>{formerrors.cost}</span>
                  )}
                  <Form.Group controlId="formFileMultiple" className="mb-3" style={{ width: '500px' }}>
                     <Form.Label>upload product image</Form.Label>
                     <Form.Control type="file" name='image' value={undefined} onChange={handleFiles} multiple />
                     {formerrors.files && (
                        <span className="red" style={{ position: 'absolute', top: 450, right: 360 }}>{formerrors.files}</span>
                     )}
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>product Warrenty</Form.Label>
                     <Form.Control as='textarea' type="text" value={productWarrenty} onChange={(e) => { setProductWarrenty(e.target.value) }} />
                     {formerrors.productWarrenty && (
                        <span className="red" style={{ position: 'absolute', top: 530, right: 30 }}>{formerrors.productWarrenty}</span>
                     )}
                     <Form.Label>paymanet terms</Form.Label>
                     <Form.Control as='textarea' type="text" value={paymentTerms} onChange={(e) => { setPaymentTerms(e.target.value) }} />
                     {formerrors.paymentTerms && (
                        <span className="red" style={{ position: 'absolute', top: 630, right: 30 }}>{formerrors.paymentTerms}</span>
                     )}
                  </Form.Group>
                  <Form.Control type="hidden" name="companyId" value={companyId} />
                  <div variant="primary" type="submit" className="d-flex justify-content-center mt-5 ">
                     <Button style={{ width: '400px' }} type="submit">submit</Button>
                  </div>
               </Form>
            </Card.Body>
         </Card>
         {serverErrors.length > 0 && (
            <ToastContainer position='bottom-end'>
               <Toast show={showToast} onClose={handleClose} animation={true} bg='warning'>
                  <Toast.Header closeButton={true}>
                     <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                     <strong className="me-auto">Server Errors</strong>
                     <small className="text-muted">just now</small>
                  </Toast.Header>
                  {serverErrors.map((ele, index) => (
                     <Toast.Body key={index}>{ele.msg}</Toast.Body>
                  ))}
               </Toast>
            </ToastContainer>
         )
         }
      </div >
   )
}