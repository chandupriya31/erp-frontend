import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import IndividualIntervalsExample from "../caroselhome";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BsEnvelope } from "react-icons/bs"
import { BiLocationPlus } from "react-icons/bi"
import { BiPhone } from "react-icons/bi"

function IndividualCompany() {
  const { id } = useParams();
  const { userState } = useContext(UserContext);
  const [mapInit, setMapInit] = useState(false);
  const company = userState.companylist.find((ele) => ele._id === id);

  useEffect(() => {
    if (company && company.contactdetails.address.lattitude && company.contactdetails.address.longitude && !mapInit) {
      try {
        const mapcomponent = L.map("map-style").setView(
          [company.contactdetails.address.lattitude, company.contactdetails.address.longitude],
          13
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        ).addTo(mapcomponent)

        L.circle([company.contactdetails.address.lattitude, company.contactdetails.address.longitude], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
        }).addTo(mapcomponent);
        setMapInit(true);
      } catch (error) {
        console.error('Error creating map or marker:', error);
      }
    }
  }, [company, mapInit]);

  if (!company) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h4 className="text-primary mb-4">Welcome to our website </h4>
          <IndividualIntervalsExample />
          <h2 className="text-dark">{company.companyname}</h2>
          <h4 className="text-primary mt-4">About Us</h4>
          <p className="text-muted"><strong>{company.details.aboutus}</strong></p>
          <h5><Link style={{ color: "green" }} to="/company/products" state={id}>Products</Link></h5>
          <h5><Link style={{ color: "green" }} to='/company/categories' state={id}>Categories</Link></h5>
          <h4 className="text-primary mt-4">Company's Vision</h4>
          <p className="text-muted"><strong>{company.details.vision}</strong></p>
          <h4 className="text-primary mt-4">Company's Mission</h4>
          <p className="text-muted"><strong>{company.details.mission}</strong></p>
          <hr style={{ height: '5px', color: "black", backgroundColor: "black", border: 'none' }} />
          <div className="mt-4" style={{ backgroundColor: "black", color: "white", padding: "20px" }}>
            <h6>Contact Details</h6>
            <div className="d-flex align-items-center">
              <i className="fas fa-map-marker-alt me-2 text-primary"></i>
              <p><BiLocationPlus /> Address - <strong>{company.contactdetails.address.name}</strong></p>
            </div>
            <div id="map-style" style={{ height: "200px", marginTop: "10px", width: "100%" }}></div>
            <div className="d-flex align-items-center">
              <i className="fas fa-envelope me-2 text-primary"></i>
              <p><BsEnvelope /> Email - <strong>{company.contactdetails.email}</strong></p>
            </div>
            <div className="d-flex align-items-center">
              <i className="fas fa-phone me-2 text-primary"></i>
              <p><BiPhone /> Phone - <strong>{company.contactdetails.phone}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualCompany;
