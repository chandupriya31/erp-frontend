import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBars/NavBar';
import CompanyNavBar from './components/NavBars/CompanyNavBar';
import CustomerNavBar from './components/customer/CustomerNavBAr';
import { useEffect, useReducer, createContext } from 'react';
import Register from './components/Auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap'
import axios from './config/axios'
import Home from './components/Home'
import Customer from './components/customer/customer';
import Login from './components/Auth/Login';
import userReducer from './reducer/UserReducer';
import AddProduct from './components/products-categories/product-add';
import Company from './components/Auth/Company';
import CompanyDetails from './components/Auth/CompanyDetails';
import CompanyList from './components/company/Company-list-home';
import AddEnquiry from './components/enquiries/AddEnquiry';
import IndividualCompany from './components/company/IndividualCompany';
import Enquires from './components/enquiries/EnquiriesContainer';
import Products from './components/products-categories/Products';
import IndividualProduct from './components/products-categories/IndividualProduct'
import { DashBoard } from './components/company/DashBoard';
import QuotationContainer from './components/quotations/QuotationContainer';
import Categories from './components/products-categories/categories';
import Customercontainer from './components/customer/enquiry-quo-container';
import Enquirylist from './components/customer/Enquirylist';
import Myenquires from './components/customer/Myenquiries';
import Quotationview from './components/customer/Quotation-view';
import CustomerProfile from './components/customer/CustomerProfile';
import PaymentDetails from './components/payment/PaymentDetails';
import PaymentSuccess from './components/payment/Payment';
// import Registration from './components/Auth/RegisterProvider';

export const UserContext = createContext()

function App() {
  const [userState, userDispatch] = useReducer(userReducer, { user: {}, company: {}, companylist: [] })
  const isLoggedIn = !!userState.user._id
  console.log(userState)
  //console.log(isLoggedIn, 'id')
  // console.log(userState, 'state')
  console.log(userState.user, 'cu')
  // console.log(userState.company, 'company')

  useEffect(() => {
    (async () => {
      try {
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
          //console.log(user)
          const companyuser = profile.data.user
          userDispatch({ type: 'USER_LOGIN', payload: user })
          userDispatch({ type: 'USER_LOGIN', payload: companyuser })
          userDispatch({ type: 'USER_COMPANY', payload: user.company })
        } catch (e) {
          console.log(e)
        }
      })()
    }
  }, [])

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      <BrowserRouter>

        {!isLoggedIn ? <NavBar /> : userState.user.role === 'companyAdmin' && <CompanyNavBar /> || userState.user.role === 'customer' && <CustomerNavBar />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/company' element={<Company />} />
          <Route path='/companyDetails' element={<CompanyDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/companydashboard' element={<DashBoard />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/add-enquiry' element={<AddEnquiry />} />
          <Route path='/company-list' element={<CompanyList />} />
          <Route path='/enquires' element={<Enquires />} />
          <Route path='/company-website/:id' element={<IndividualCompany />} />
          <Route path='/company/products' element={<Products />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/quotation-list' element={<QuotationContainer />} />
          <Route path='/company/categories' element={<Categories />} />
          <Route path='/product/:id' element={<IndividualProduct />} />
          <Route path='/customer/enquiries' element={<Customercontainer />} />
          <Route path='/enquirylist/:id' element={<Enquirylist />} />
          <Route path="/my-enquiries" element={<Myenquires />} />
          <Route path='/quotationview/:id' element={<Quotationview />} />
          <Route path='/customerprofile' element={<CustomerProfile/>}/>
          <Route path='/payment-details' element={<PaymentDetails/>}/>
          <Route path='/quotation/:id' element={<PaymentSuccess/>}/>
          {/* <Route path='/cancel' element={<PaymentCancel/>}/> */}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
