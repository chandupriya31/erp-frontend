import { useLocation, useParams } from "react-router-dom"
import queryString from 'query-string'

function PaymentSuccess(props){
    const {id} = useParams()
    console.log(id)
    const location = useLocation()
    console.log(location)
    const {search} = location
    console.log('search',queryString.parse(search))
    return (
        <div>
            <b>Payment page</b>
        </div>
    )
}

export default PaymentSuccess