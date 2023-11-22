import React, { useState } from "react";

export default function Register() {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [userType, setUserType] = useState('customer'); // Default to 'customer'

   const handleUserTypeChange = (e) => {
      setUserType(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // Here you can handle form submission based on user type
      // For example, if userType === 'company', perform specific actions
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label>
               <input
                  type="radio"
                  value="customer"
                  checked={userType === 'customer'}
                  onChange={handleUserTypeChange}
               />
               Customer
            </label>
            <label>
               <input
                  type="radio"
                  value="company"
                  checked={userType === 'company'}
                  onChange={handleUserTypeChange}
               />
               Company
            </label>
            <br />

            {userType === 'company' ? (
               <>
                  <label>Enter Username</label><br />
                  <input
                     type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                  /><br />

                  <label>Enter Email</label><br />
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  /><br />

                  <label>Enter Password</label><br />
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  /><br />
                  <button type="submit">Next Page</button>
               </>
            ) : (
               <div>
                  <label>Enter Username</label><br />
                  <input
                     type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                  /><br />

                  <label>Enter Email</label><br />
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  /><br />

                  <label>Enter Password</label><br />
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  /><br />
                  <button type="submit">Submit</button>
               </div>
            )}
         </form>
      </div>
   );
}
