import { useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { startPayment } from "../../actions/PaymentAction"

function PaymentDetails(){
    const dispatch = useDispatch()
    const state = useLocation()
    // console.log(state.state,'state')
    const quote = state.state
    const [type,setType] = useState('Debit')
    const handlePaymentClick = (e)=>{
        e.preventDefault()
        const formData = {
            quotation:quote,
            type
        }
        localStorage.setItem('quotation',formData.quotation)
        dispatch(startPayment(formData))
    }
    return (
        <div>
            <b>Select type of payment</b>
            <p>Quotation Id - <b>{quote}</b></p>
            <label>Type</label><br/>
            <input 
                type="radio" 
                value='Debit'
                id="Debit" 
                checked = {type === 'Debit'} 
                onChange={e=>setType(e.target.value)}
            /> <label htmlFor="Debit">Debit</label> 
            <input 
                type="radio" 
                value='Credit'
                id="Credit"
                checked = {type === 'Credit'} 
                onChange={e=>setType(e.target.value)}
            /> <label htmlFor="Credit">Credit</label><br/>
            <button onClick={handlePaymentClick}>Move to payment</button>
        </div>
    )
}

export default PaymentDetails