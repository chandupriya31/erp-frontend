import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button } from 'react-bootstrap';

const Company = (props) => {
    const { state } = useLocation()
    const data = state
    const navigate = useNavigate()
    const [companyname, setCompanyName] = useState('')
    const [GST, setGst] = useState('')
    const [contactdetails, setContactDetails] = useState({
        address: {
            name: ''
        },
        phone: '',
        email: ''
    })
    const [formErrors, setFormErrors] = useState({})

    function runValidations() {
        const errors = {}
        if (companyname.length === 0) {
            errors.companyname = '*Company name is required'
        }
        if (GST.length === 0) {
            errors.GST = '*GST required'
        }
        if (contactdetails.address.name.length === 0) {
            errors.contactdetails = {
                ...errors.contactdetails,
                address: { name: '*Company address required' }
            }
        }
        if (contactdetails.phone.length === 0) {
            errors.contactdetails = {
                ...errors.contactdetails,
                phone: '*Phone number required'
            }
        } else if (contactdetails.phone.length !== 10) {
            errors.contactdetails = {
                ...errors.contactdetails,
                phone: '*Enter valid number'
            }
        }
        if (contactdetails.email.length === 0) {
            errors.contactdetails = {
                ...errors.contactdetails,
                email: '*Company email required'
            }
        }
        setFormErrors(errors);
        return errors;
    }

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
    }, [])

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
        const { name, value } = e.target
        setContactDetails((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleBack = (e) => {
        e.preventDefault()
        const errors = runValidations()

        const formData = {
            companyname,
            GST,
            contactdetails
        }
        localStorage.setItem('companyFormData', JSON.stringify(formData))
        navigate('/register', { state: { ...data, ...formData } })
    }

    const handleClick = () => {
        const errors = runValidations()

        if (Object.keys(errors).length === 0) {
            const formData = {
                companyname,
                GST,
                contactdetails
            }
            localStorage.setItem('companyFormData', JSON.stringify(formData))
            navigate('/companyDetails', { state: { ...data, ...formData } })
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <Card>
                        <Card.Body>
                            <Form>
                                <h1>Company Details</h1>
                                <Form.Group controlId="companyName">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={companyname}
                                        onChange={e => setCompanyName(e.target.value)}
                                    />
                                    {formErrors.companyname && (
                                        <div className="error-message">{formErrors.companyname}</div>
                                    )}
                                </Form.Group>
                                <Form.Group controlId="GST">
                                    <Form.Label>GST</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={GST}
                                        onChange={e => setGst(e.target.value)}
                                    />
                                    {formErrors.GST && (
                                        <div className="error-message">{formErrors.GST}</div>
                                    )}
                                </Form.Group>
                                <h4>Contact details</h4>
                                <Form.Group controlId="address.name">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={contactdetails.address.name}
                                        onChange={handleAddressChange}
                                    />
                                    {formErrors.contactdetails && formErrors.contactdetails.address && (
                                        <div className="error-message">{formErrors.contactdetails.address.name}</div>
                                    )}
                                </Form.Group>
                                <Form.Group controlId="phno">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={contactdetails.phone}
                                        name="phone"
                                        onChange={handleChange}
                                    />
                                    {formErrors.contactdetails && formErrors.contactdetails.phone && (
                                        <div className="error-message">{formErrors.contactdetails.phone}</div>
                                    )}
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={contactdetails.email}
                                        name="email"
                                        onChange={handleChange}
                                    />
                                    {formErrors.contactdetails && formErrors.contactdetails.email && (
                                        <div className="error-message">{formErrors.contactdetails.email}</div>
                                    )}
                                </Form.Group>
                                <Button variant="primary" onClick={handleBack}>Back</Button>
                                <Button variant="primary" onClick={handleClick}>Next Details</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Company;
