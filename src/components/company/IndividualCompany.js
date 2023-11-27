import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import IndividualIntervalsExample from "../caroselhome";

function IndividualCompany() {
  const { id } = useParams();
  const { userState } = useContext(UserContext);
  const company = userState.companylist.find((ele) => {
    return ele._id === id;
  })

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h4 className="text-primary mb-4">Welcome to our website</h4>
          <IndividualIntervalsExample />
          <h2 className="text-dark">{company.companyname}</h2>
          <h4 className="text-primary mt-4">About Us</h4>
          <p className="text-muted"><strong>{company.details.aboutus}</strong></p>
          <h4 className="text-primary mt-4">Company's Vision</h4>
          <p className="text-muted"><strong>{company.details.vision}</strong></p>
          <h4 className="text-primary mt-4">Company's Mission</h4>
          <p className="text-muted"><strong>{company.details.mission}</strong></p>

          <div className="mt-4">
            <h6>Contact Details</h6>
            <div className="d-flex align-items-center">
              <i className="fas fa-map-marker-alt me-2 text-primary"></i>
              <p>Address - <strong>{company.contactdetails.address.name}</strong></p>
              <>{company.contactdetails.address.lattitude}  </>
              <>{company.contactdetails.address.longitude}</>
            </div>
            <div className="d-flex align-items-center">
              <i className="fas fa-envelope me-2 text-primary"></i>
              <p>Email - <strong>{company.contactdetails.email}</strong></p>
            </div>
            <div className="d-flex align-items-center">
              <i className="fas fa-phone me-2 text-primary"></i>
              <p>Phone - <strong>{company.contactdetails.phone}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualCompany;
