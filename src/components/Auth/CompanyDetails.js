import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "../../config/axios"

function CompanyDetails(props){
    const {state} = useLocation()
    const navigate = useNavigate()
    const [details,setDetails] = useState({
        vision:'',
        mission:'',
        aboutus:''
    })
    const [serverErrors, setServerErrors] = useState([])
    console.log(serverErrors);
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
        navigate('/company',{state:formData})
    }
    const handleSubmit = async(e)=>{  
        e.preventDefault()
        const formData = {
            username: state.formData.username ,
            email: state.formData.email,
            password: state.formData.password,
            role: state.formData.role,
            companyname:state.companyname,
            GST:state.GST,
            contactdetails:state.contactdetails,
            details
        }
        //console.log(formData)
        try{
            const companyData = await axios.post('/api/company/register',formData)
            console.log(companyData.data)
            localStorage.clear()
        }catch(e){
            setServerErrors(e.response.data.errors)
        }
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
            <label htmlFor="mission">Company Mission</label><br />
            <textarea
                id="mission"
                name="mission"
                value={details.mission}
                onChange={handleDetails}
            ></textarea><br />
            <label htmlFor="vision">Company Vision</label><br />
            <textarea
                id="vision"
                name="vision"
                value={details.vision}
                onChange={handleDetails}
            ></textarea><br/>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleSubmit}>Submit</button>
            {serverErrors.length>0 && (
                <div>
                    {serverErrors.map(ele =>{
                        return <li>{ele.msg}</li>
                    })}
                </div>
            )}
        </div>
    )
}

export default CompanyDetails
