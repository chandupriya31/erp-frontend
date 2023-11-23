import React, { useEffect, useState } from "react"
import axios from "../../config/axios";
import {useNavigate} from 'react-router-dom'

export default function Register(props) {
   const navigate = useNavigate()
   // const {userDispatch} = useContext(UserContext)
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [role,setRole] = useState('')
   const [serverErrors,setServerErrors] = useState([])

   useEffect(() => {
      const savedFormData = JSON.parse(localStorage.getItem('registerFormData')) || {};
      setUsername(savedFormData.username || '');
      setEmail(savedFormData.email || '');
      setPassword(savedFormData.password || '');
      setRole(savedFormData.role || 'customer');
   }, [])

   const handleUserTypeChange = (e) => {
      setRole(e.target.value);
   };

   const handleSubmit = async(e) => {
      e.preventDefault()
      const formData = {
         username,
         email,
         password,
         role
      }
      // console.log(formData)
      if(role === 'customer'){
         try{
            const response = await axios.post('/api/user/register',formData)
            const user = response.data
            navigate('/login')
            setUsername('')
            setEmail('')
            setPassword('')
            setRole('')
            // console.log(user)
         }catch(e){
            console.log(e)
            setServerErrors(e.response.data.errors)
         }   
      }else {
         localStorage.setItem('registerFormData', JSON.stringify(formData));
         navigate('/company',{state:{formData}})
      }
      // Here you can handle form submission based on user type
      // For example, if userType === 'company', perform specific actions
   }

   return (
      <div>
         <form>
            <h2>Register</h2>

            {serverErrors.length>0 && (
               <div>
                  {serverErrors.map(ele =>{
                     return <li>{ele.msg}</li>
                  })}
               </div>
            )}
            <label htmlFor="username">Username</label><br/>
            <input 
               type="text"
               id="username"
               value={username}
               onChange={e => setUsername(e.target.value)}
            /><br/>
            <label htmlFor="email">Email</label><br/>
            <input 
               type="email"
               id="email"
               value={email}
               onChange={e => setEmail(e.target.value)}
            /><br/>
            <label htmlFor="password">Password</label><br/>
            <input 
               type="password"
               id="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
            /><br/>
            <label>
               <input
                  type="radio"
                  value="customer"
                  checked={role === 'customer'}
                  onChange={handleUserTypeChange}
               />
               Customer
            </label>
            <label>
               <input
                  type="radio"
                  value="companyAdmin"
                  checked={role === 'companyAdmin'}
                  onChange={handleUserTypeChange}
               />
               Company
            </label><br />
            <button onClick={handleSubmit}>{role === 'customer'?'Submit':'Next'}</button>
         </form>
      </div>
   );
}

 
