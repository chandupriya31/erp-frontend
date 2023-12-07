import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import { BsPersonCircle } from "react-icons/bs"

export default function CustomerNavBar() {

   const { userDispatch } = useContext(UserContext)
   const handleLogout = () => {
      localStorage.removeItem('token')
      userDispatch({ type: 'LOGOUT_USER' })
   }
   return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ marginTop: "10px" }}>
         <div className="container-fluid">
            <Link className="navbar-brand" >Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                     <Link className="nav-link" to='/' >Home</Link>
                  </li>
                  {/* <li className="nav-item">
                     <Link className="nav-link" to="/customer">DashBoard</Link>
                  </li> */}
                  <li className="nav-item">
                     <Link className="nav-link" to="customer-order">MyOrders</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to='/customer/enquiries'>MyEnquires</Link>
                  </li>
                  {/* <li className="nav-item">
                     <Link className="nav-link" to="/add-enquiry">Add Enquiry</Link>
                  </li> */}
                  <li className="nav-item">
                     <Link className="nav-link" to="/company-list">Companies</Link>
                  </li>
               </ul>
               <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                     <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to='/customerprofile'><BsPersonCircle style={{ fontSize: '25px' }}/></Link>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}
