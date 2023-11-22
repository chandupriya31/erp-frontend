import { useFormik } from 'formik'
import axios from '../../config/axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import * as Yup from 'yup'
import { UserContext } from '../../App'
import { useNavigation } from 'react-router-dom'
export default function Login() {
   const { userDispatch } = useContext(UserContext)
   const navigate = useNavigate()
   const formik = useFormik({
      initialValues: {
         email: '',
         password: ''
      },
      onSubmit: async (formData) => {
         const data = {
            email: formData.email,
            password: formData.password
         }
         // console.log(data)
         try {
            const response = await axios.post('/api/login', data)
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            const profile = await axios.get('/api/getprofile', {
               headers: {
                  Authorization: localStorage.getItem('token')
               }
            })
            const user = profile.data
            console.log('user', user);
            const companyuser = profile.data.user
            console.log(companyuser, 'com-user')
            if (user.role == 'customer') {
               userDispatch({ type: 'USER_LOGIN', payload: user })
               navigate('/customer')
            }
            if (user.user.role == 'companyAdmin') {
               userDispatch({ type: 'USER_LOGIN', payload: companyuser })
               navigate('/companyContainer')
            }
         } catch (e) {
            console.log(e)
         }
      }
   })

   return (
      <div>
         <form onSubmit={formik.handleSubmit}>
            <label>enter email</label><br />
            <input type="email" value={formik.values.email} onChange={formik.handleChange} name="email" /><br />
            <label>enter password</label><br />
            <input type="password" value={formik.values.password} onChange={formik.handleChange} name="password" /><br />
            <input type="submit" />
         </form>
      </div>

   )
}