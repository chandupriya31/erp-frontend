import { useEffect, useState } from "react"
import axios from "../../config/axios"
import { useNavigate } from "react-router-dom"
import {useDispatch} from 'react-redux'
import { setAddEnquiry } from "../action/enquiry-action"

function AddEnquiry(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [products,setProducts] = useState([])
    const [productId,setProductId] = useState('')
    const [phNo,setphNo] = useState('')
    const [quantity,setQuantity] = useState('')
    const [company,setCompany] = useState([])
    const [companyId,setCompanyId] = useState('')

    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get('/api/products/list')
                const companies = await axios.get('/api/companies/list')
                setProducts(response.data)
                setCompany(companies.data)
            }catch(e){
                console.log(e.response.data.errors)
            }
        })()
    },[])
    const handleEnquirySubmit = async(e)=>{
        e.preventDefault()
        const formData = {
            productId,
            phNo,
            quantity,
            companyId
        }
        dispatch(setAddEnquiry(({formData,navigate})))
        setProductId('')
        setphNo('')
        setQuantity('')
        setCompanyId('')
    }

    // console.log(products)
    
    return (
        <div>
            <h2>Add Enquiry</h2>
            <label id="product">Product</label>
            <select value={productId} onChange={e=>setProductId(e.target.value)}>
                <option value="">Select product</option>
                {products.map(ele =>{
                    return <option key={ele._id} value={ele._id}>{ele.productname}</option>
                })}
            </select><br/>
            <label htmlFor="phNo">Mobile Number</label><br/>
            <input 
                type="number"
                id="phNo"
                value={phNo}
                onChange={e=>setphNo(e.target.value)}
            /><br/>
            <label htmlFor="quantity">Quantity</label><br/>
            <input 
                type="number"
                id="quantity"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
            /><br/>
            <label htmlFor="company">Company</label><br/>
            <select 
                id ="company" 
                value={companyId} 
                onChange={e=>setCompanyId(e.target.value)}>
                <option value="">Select Company</option>
                {company.map(ele =>{
                    return <option key={ele._id} value={ele._id}>{ele.companyname}</option>
                })}
            </select><br/>
            <button onClick={handleEnquirySubmit}>Submit Enquiry</button>
        </div>
    )
}

export default AddEnquiry