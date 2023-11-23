import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBars/NavBar';
import CompanyNavBar from './components/NavBars/CompanyNavBar';
import CustomerNavBar from './components/NavBars/CustomerNavBAr';
import { useEffect, useState, useReducer, createContext, useContext } from 'react';
import Register from './components/Auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap'
import axios from './config/axios'
import Home from './components/Home';
import CompanyContainer from './components/company/CompanyContainer';
import Customer from './components/customer/customer';
import Login from './components/Auth/Login';
import userReducer from './reducer/UserReducer';
import AddProduct from './components/company/product-add';
import Company from './components/Auth/Company';
import CompanyDetails from './components/Auth/CompanyDetails';
// import Registration from './components/Auth/RegisterProvider';
export const UserContext = createContext()


function App() {
  const [userState, userDispatch] = useReducer(userReducer, { user: {} })
  const isLoggedIn = !!userState.user._id
  console.log(isLoggedIn, 'id')
  console.log(userState, 'state')
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
          const companyuser = profile.data.user
          userDispatch({ type: 'USER_LOGIN', payload: user })
          userDispatch({ type: 'USER_LOGIN', payload: companyuser })
        } catch (e) {
          console.log(e)
        }
      })()
    }
  }, [])

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      <BrowserRouter>

        {!isLoggedIn ? <NavBar /> : userState.user.role == 'companyAdmin' && <CompanyNavBar /> || userState.user.role == 'customer' && <CustomerNavBar />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/company' element={<Company />} />
          <Route path='/companyDetails' element={<CompanyDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/companyContainer' element={<CompanyContainer />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/addproduct' element={<AddProduct />} />
          {/* <Route path='/registration' element={<Registration/>}/> */}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
