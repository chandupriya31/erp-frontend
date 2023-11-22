import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "../../config/axios"
// import { RegisterContext } from "./Register"

function CompanyDetails(props){
    // const {username,email,password,companyname,GST,contactdetails} = props
    const {state} = useLocation()
    // console.log(state,'data1')
    // console.log(state.formData.username)
    // const {user} = useContext(RegisterContext)
    // console.log(user)
    const navigate = useNavigate()
    const [details,setDetails] = useState({
        vision:'',
        mission:'',
        aboutus:''
    })
    const handleDetails = (e) => {
        const { name, value } = e.target
        setDetails((prev) => ({
            ...prev, [name]: value
        }))
    }
    const handleBack = (e)=>{
        e.preventDefault()
        const formData = {
            details
        }
        navigate('/company')
    }
    const handleSubmit = async(e)=>{  
        e.preventDefault()
        const formData = {
            username: state.formData.username ,
            email: state.formData.email,
            password: state.formData.password,
            companyname:state.companyname,
            GST:state.GST,
            contactdetails:state.contactdetails,
            details
        }
        console.log(formData)
        const companyData = await axios.post('/api/company/register',formData)
        console.log(companyData.data)
    }
    return(
        <div>
            <h2>Company Details</h2>
            <label htmlFor="aboutus">About Company</label><br />
            <textarea
                id="aboutus"
                name="aboutus"
                value={details.aboutus}
                onChange={handleDetails}
            ></textarea><br />
            <label htmlFor="mission">About Company</label><br />
            <textarea
                id="mission"
                name="mission"
                value={details.mission}
                onChange={handleDetails}
            ></textarea><br />
            <label htmlFor="vision">About Company</label><br />
            <textarea
                id="vision"
                name="vision"
                value={details.vision}
                onChange={handleDetails}
            ></textarea><br/>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default CompanyDetails