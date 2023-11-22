import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import { useEffect, useState, useReducer, createContext, useContext } from 'react';
import Register from './components/Auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home';
import userReducer from './reducer/UserReducer';
import Company from './components/Auth/Company';
import CompanyDetails from './components/Auth/CompanyDetails';
export const UserContext = createContext()


function App() {
  const [userState, userDispatch] = useReducer(userReducer, { user: {} })

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/company' element={<Company/>}/>
          <Route path='/companyDetails' element={<CompanyDetails/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
