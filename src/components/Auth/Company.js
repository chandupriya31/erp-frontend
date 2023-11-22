import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Company = ()=>{
    const navigate = useNavigate()
    const [companyname,setCompanyName] = useState('')
    const [GST,setGst] = useState('')
    const [contactdetails,setContactDetails] = useState({
        address: {
            name: ''
        },
        phone:'',
        email:''
    })

    const handleChange = (e)=>{
        const {name,value} = e.target
        setContactDetails((prev)=>({
            ...prev,[name]:value
        }))
    }

    const handleBack = (e)=>{
        e.preventDefault()
        const formData={
            companyname,
            GST,
            contactdetails
        }
        navigate('/register')
    }

    const handleClick = (e)=>{
        e.preventDefault()
        const formData={
            companyname,
            GST,
            contactdetails
        }
        console.log(formData)
        navigate('/companyDetails')
    }

    return (
        <div>
            <h1>Company Details</h1>
            <label htmlFor="companyname">Company Name</label><br/>
            <input 
                type="text"
                id="companyName"
                value={companyname}
                onChange={e=>setCompanyName(e.target.value)}
            /><br/>
            <label htmlFor="GST">GST</label><br/>
            <input 
                type="text"
                id="GST"
                value={GST}
                onChange={e=>setGst(e.target.value)}
            /><br/>
            <h4>Contact details</h4>
            <label htmlFor="address.name">Address</label><br/>
            <input 
                type="text"
                id="address.name"
                name="address.name"
                value={contactdetails.address.name}
                onChange={handleChange}
            /><br/>
            <label htmlFor="phno">Phone Number</label><br/>
            <input
                type="number"
                id="phno"
                value={contactdetails.phone}
                name="phone"
                onChange={handleChange}
            /><br/>
            <label htmlFor="email">Email</label><br/>
            <input
                type="email"
                id="email"
                value={contactdetails.email}
                name="email"
                onChange={handleChange}
            /><br/>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleClick}>Next Details</button>
        </div>
    )
}

export default Company