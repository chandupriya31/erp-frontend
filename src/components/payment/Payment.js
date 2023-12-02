import { Link, useLocation, useNavigate} from "react-router-dom"
import queryString from 'query-string'
import { useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"

function Payment(props){
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate
    console.log(location)
    const {search} = location
    console.log('query string',search);
    console.log('search',queryString.parse(search))
    const {success,cancel} = search
    const back = ()=>{
        navigate(`/quotation-view/${localStorage.getItem('quotation')}`)
        localStorage.removeItem('quotation')
    }
    useEffect(()=>{
        if(success){
            (async()=>{
                dispatch()
            })()
        }
    })
    return (
        <div>
            <Button>Go Back to quotation</Button>
        </div>
    )
}

export default Payment