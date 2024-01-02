import { useFormik } from 'formik';
import axios from '../../config/axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { UserContext } from '../../App';
import Spinner from 'react-bootstrap/Spinner'
import { useDispatch } from 'react-redux';
import { startGetEnquiries } from '../../actions/enquiry-action';
import { startSetQuotation } from '../../actions/quotation-action';
import { getOrderList } from '../../actions/order-action';
import { startGetCategory, startGetProduct } from '../../actions/productactionCltr';
export default function Login() {
   const dispatch = useDispatch()
   const { userDispatch } = useContext(UserContext);
   const [serverError, setServerError] = useState([]);
   const [isSubmitting, setIsSubmitting] = useState(false)
   const navigate = useNavigate();

   useEffect(() => {
      (async () => {
         try {
            dispatch(startGetProduct())
            dispatch(startGetCategory())
            const response = await axios.get('/api/companies/list')
            userDispatch({ type: 'COMAPNY_LIST', payload: response.data })
         } catch (e) {
            console.log(e)
         }
      })()
   }, [])
   useEffect(() => {
      if (localStorage.getItem('token')) { // handling page reload
         (async () => {
            try {
               const profile = await axios.get('/api/getprofile', {
                  headers: {
                     'Authorization': localStorage.getItem('token')
                  }
               })
               const user = profile.data
               console.log(user, 'user data')
               const companyuser = profile.data.user
               userDispatch({ type: 'USER_LOGIN', payload: user })
               userDispatch({ type: 'USER_LOGIN', payload: companyuser })
               userDispatch({ type: 'USER_COMPANY', payload: user.company })
               if (user.role === 'companyAdmin' || user.role === 'customer') {
                  dispatch(startGetEnquiries())
                  dispatch(startSetQuotation())
                  dispatch(getOrderList())
               }
            } catch (e) {
               console.log(e)
            }
         })()
      }
   }, [])

   const registerValidation = Yup.object().shape({
      email: Yup.string()
         .required('Email is required')
         .email('Please enter a valid email'),
      password: Yup.string()
         .required('Password is required')
         .min(8, 'Password must be at least 8 characters')
   });

   const formik = useFormik({
      initialValues: {
         email: '',
         password: ''
      },
      validationSchema: registerValidation,
      validateOnChange: false,
      onSubmit: async (formData) => {
         try {
            setIsSubmitting(true)
            const response = await axios.post('/api/login', formData);
            localStorage.setItem('token', response.data.token);
            const profile = await axios.get('/api/getprofile', {
               headers: {
                  Authorization: localStorage.getItem('token')
               }
            });
            const user = profile.data;
            const company = user.company
            console.log(user.company, 'user+company')
            const companyUser = profile.data.user;

            if (user.role === 'customer') {
               userDispatch({ type: 'USER_LOGIN', payload: user });
               navigate('/');
            }
            if (user.user.role === 'companyAdmin') {
               userDispatch({ type: 'USER_LOGIN', payload: companyUser });
               userDispatch({ type: 'USER_COMPANY', payload: company })
               navigate('/companyDashboard');
            }
         } catch (e) {
            setServerError(e.response.data.errors);
         } finally {
            setIsSubmitting(false); // Reset submitting state after submission
         }
      }
   })
   return (
      <div className="container d-flex justify-content-center mt-5 ">
         {serverError.length > 0 && (
            <div className="server-errors mt-3 ">
               {serverError.map((ele, index) => (
                  <div key={index} className="alert alert-danger" style={{ width: '200px' }} role="alert">
                     <b>Server Error</b><br />
                     {ele.msg}
                  </div>
               ))}
            </div>
         )}
         <div className="row w-50 justify-content-end ">
            <div className="col-md-6  w-75">
               <div className="card shadow p-3 mb-5 bg-body-tertiary rounded">
                  <div className="card-body d-flex flex-column justify-content-center">
                     <h5 className="card-title text-center mb-4">Login</h5>
                     <form onSubmit={formik.handleSubmit}>
                        <div className="mb-5">
                           <label htmlFor="email" className="form-label" style={{ color: 'blue' }}>Enter Email</label>
                           <input
                              type="email"
                              className="form-control"
                              placeholder='name@gmail.com'
                              id="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              name="email"
                           />
                           <div className="text-danger">{formik.errors.email}</div>
                        </div>
                        <div className="mb-3">
                           <label htmlFor="password" className="form-label" style={{ color: 'blue' }}>Enter Password</label>
                           <input
                              type="password"
                              className="form-control"
                              placeholder='password'
                              id="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              name="password"
                           />
                           <div className="text-danger">{formik.errors.password}</div>
                        </div>
                        <div className='d-flex justify-content-center'>
                           <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                              {isSubmitting ? (
                                 <Spinner animation="border" variant="light" size="sm" />
                              ) : (
                                 'Submit'
                              )}
                           </button>

                        </div>
                        <h5 className="card-title text-center mt-4" style={{ color: "orange" }}>Register here - <Link to='/register'>SignUp</Link></h5>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
