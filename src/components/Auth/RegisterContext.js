// File: RegisterContext.js
import React, { createContext, useContext, useReducer } from "react";

const RegisterContext = createContext();

const initialState = {
  username: "",
  email: "",
  password: "",
  role: "",
  company: {
    name: "",
    GST: "",
    contactDetails: {
      address: {
        name: "",
      },
      phone: "",
      email: "",
    },
    details: {
      vision: "",
      mission: "",
      aboutus: "",
    }
  }
}

const registerReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER_DATA":
      return { ...state, ...action.payload }
    case "UPDATE_COMPANY_DATA":
      return {
        ...state,
        company: { ...state.company, ...action.payload }
      }
    default:
      return state
  }
};

export const RegisterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(registerReducer, initialState);

  return (
    <RegisterContext.Provider value={{ state, dispatch }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegisterContext = () => {
  return useContext(RegisterContext)
}
