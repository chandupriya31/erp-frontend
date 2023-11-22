import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
// import { RegisterContext } from "./Register"

const Company = (props)=>{
    // const {user,dispatch} = useContext(RegisterContext)
    // console.log(user)
    const {state} = useLocation()
    const data = state
    // console.log('data',data)
    // console.log(state,'state')
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

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        // console.log(name,value);
        setContactDetails((prev) => ({
            ...prev,
            address: {
                ...prev.address.name,
                [name]: value
            }
        }));
    };

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
        navigate('/register',{state:{...data,...formData}})
    }

    const handleClick = ()=>{
        // e.preventDefault()
        const formData={
            companyname,
            GST,
            contactdetails
        }
        // console.log(formData)
        // console.log({...data,...formData},'2nd')
        navigate('/companyDetails',{state:{...data,...formData}})
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
                name="name"
                value={contactdetails.address.name}
                onChange={handleAddressChange}
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