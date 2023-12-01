import { useContext, useState } from "react"
import { UserContext } from "../../App"
import axios from "../../config/axios"

function CustomerProfile(){
    const {userState,userDispatch} = useContext(UserContext)
    console.log('user',userState.user)
    const user = userState.user
    console.log(user)
    const [username,setUsername] = useState(user.username)
    const [email,setEmail] = useState(user.email)
    const handleChange = async(e)=>{
        e.preventDefault()
        const formData = {
            username,
            email
        }
        try{
            const response = await axios.put('/api/user/update',formData,{
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            userDispatch({type:'UPDATE_USER',payload:response.data})
        }catch(e){
            console.log(e)
        }
    }
    return (
        <div>
            <h4>My Profile</h4>
            <label>Username</label> - <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/><br/>
            <label>Email</label> - <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <p>Your role - <b>{user.role}</b></p>
            <p>Total Enquiries - <b>{user.myenquiries.length}</b></p>
            <p>Total Quotations - <b>{user.myQuotations.length}</b></p>
            <button onClick={handleChange}>Save</button>
        </div>
    )
}

export default CustomerProfile