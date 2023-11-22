import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CompanyDetails(props){
    const {username,email,password,companyname,GST,contactdetails} = props
    const navigate = useNavigate()
    const [details,setDetails] = useState({
        vision:'',
        mission:'',
        aboutus:''
    })
    const handleDetails = (e)=>{
        const {name,value} = e.target
        setDetails((prev)=>({
            ...prev,[name]:value
        }))
    }
    const handleBack = (e)=>{
        e.preventDefault()
        const formData = {
            details
        }
        navigate('/company')
    }
    const handleSubmit = (e)=>{  
        e.preventDefault()
        const formData = {
            username,
            email,
            password,
            companyname,
            GST,
            contactdetails,
            details
        }
        console.log('main',formData)
    }
    return(
        <div>
            <h2>Company Details</h2>
            <label htmlFor="aboutus">About Company</label><br/>
            <textarea
                id="aboutus"
                name="aboutus"
                value={details.aboutus}
                onChange={handleDetails}
            ></textarea><br/>
            <label htmlFor="mission">About Company</label><br/>
            <textarea
                id="mission"
                name="mission"
                value={details.mission}
                onChange={handleDetails}
            ></textarea><br/>
            <label htmlFor="vision">About Company</label><br/>
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