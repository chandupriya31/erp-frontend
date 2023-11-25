import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../../index.css' // Import your CSS file
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Company = (props) => {
    const { state } = useLocation();
    const data = state;
    const navigate = useNavigate();
    const [companyname, setCompanyName] = useState('');
    const [GST, setGst] = useState('');
    const [contactdetails, setContactDetails] = useState({
        address: {
            name: ''
        },
        phone: '',
        email: ''
    });

    useEffect(() => {
        const savedFormData = JSON.parse(localStorage.getItem('companyFormData')) || {};
        setCompanyName(savedFormData.companyname || '');
        setGst(savedFormData.GST || '');
        setContactDetails(savedFormData.contactdetails || {
            address: {
                name: ''
            },
            phone: '',
            email: ''
        });
    }, []);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setContactDetails((prev) => ({
            ...prev,
            address: {
                ...prev.address.name,
                [name]: value
            }
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBack = (e) => {
        e.preventDefault();
        const formData = {
            companyname,
            GST,
            contactdetails
        };
        localStorage.setItem('companyFormData', JSON.stringify(formData));
        navigate('/register', { state: { ...data, ...formData } });
    };

    const handleClick = () => {
        const formData = {
            companyname,
            GST,
            contactdetails
        };
        localStorage.setItem('companyFormData', JSON.stringify(formData));
        navigate('/companyDetails', { state: { ...data, ...formData } });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <Card className="company-card p-4 rounded" style={{ maxWidth: '500px' }}>
                <Card.Body>
                    <h1 className="mb-4">Company Details</h1>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                id="companyName"
                                value={companyname}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>GST</Form.Label>
                            <Form.Control
                                type="text"
                                id="GST"
                                value={GST}
                                onChange={(e) => setGst(e.target.value)}
                            />
                        </Form.Group>
                        <h4>Contact details</h4>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                id="address.name"
                                name="name"
                                value={contactdetails.address.name}
                                onChange={handleAddressChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="number"
                                id="phno"
                                value={contactdetails.phone}
                                name="phone"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                value={contactdetails.email}
                                name="email"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button onClick={handleBack} variant="secondary" className="me-2">Back</Button>
                        <Button onClick={handleClick} variant="primary">Next Details</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Company;
