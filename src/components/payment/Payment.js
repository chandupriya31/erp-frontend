import { Link, useLocation, useNavigate} from "react-router-dom"
import queryString from 'query-string'
import { useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { startUpdatePayment } from "../../actions/PaymentAction"
import { deletePayment } from "../../actions/PaymentAction"

function Payment(props){
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location)
    const {search} = location
    console.log('query string',search);
    console.log('search',queryString.parse(search))
    const {success,cancel} = queryString.parse(search)
    console.log(success,'success')
    const back = ()=>{
        navigate(`/quotationview/${localStorage.getItem('enquiry')}`)
        localStorage.removeItem('enquiry')
        localStorage.removeItem('quotation')
        localStorage.removeItem('transactionId')
    }

    const home = () =>{
        navigate('/customer-order')
        localStorage.removeItem('enquiry')
        localStorage.removeItem('quotation')
        localStorage.removeItem('transactionId')
    }

    useEffect(()=>{
        if(success){
            (async()=>{
                dispatch(startUpdatePayment(localStorage.getItem('quotation')))
                // back()
            })()
        }else{
            (async()=>{
                dispatch(deletePayment(localStorage.getItem('transactionId')))
                // home()
            })()
        }
    },[])

    return (
        <div>
            {success ? <Button onClick={home}>Get back to orders</Button>:<Button onClick={back}>Go Back to quotation</Button>}    
        </div>
    )
}

export default Payment