import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";

export default function CompanyNavBar() {
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
                  {/* <li className="nav-item">
                     <Link className="nav-link" to="/">Home</Link>
                  </li> */}
                  <li className="nav-item">
                     <Link className="nav-link" to="/addproduct">ADDProducts</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="#">add Categories</Link>
                  </li>
                  {/* <li className="nav-item dropdown">
                     <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categories
                     </a>
                     <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                     </ul>
                  </li> */}
               </ul>
               <ul className="navbar-nav ms-auto">
                  {/* <li className="nav-item">
                     <Link className="nav-link" to='/register'>Register</Link>
                  </li> */}
                  <li className="nav-item">
                     <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}
