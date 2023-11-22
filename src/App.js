import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import { useEffect, useState, useReducer, createContext, useContext } from 'react';
import Register from './components/Auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from './config/axios'
import Home from './components/Home';
import CompanyContainer from './components/company/CompanyContainer';
import Customer from './components/customer/customer';
import Login from './components/Auth/Login';
import userReducer from './reducer/UserReducer';

import Company from './components/Auth/Company';
import CompanyDetails from './components/Auth/CompanyDetails';
export const UserContext = createContext()


function App() {
  const [userState, userDispatch] = useReducer(userReducer, { user: {} })
  console.log(userState,'state')
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
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/company' element={<Company/>}/>
          <Route path='/companyDetails' element={<CompanyDetails/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/companyContainer' element={<CompanyContainer />} />
          <Route path='/customer' element={<Customer />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
