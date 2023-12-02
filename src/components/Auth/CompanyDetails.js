import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CompanyDetails(props) {
    const { state } = useLocation();
    console.log(state)
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        vision: '',
        mission: '',
        aboutus: ''
    });
    const [serverErrors, setServerErrors] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    function runValidations() {
        const errors = {};
        if (details.vision.trim() === "") {
            errors.vision = '*Company vision is required';
        }
        if (details.mission.trim() === "") {
            errors.mission = '*Company mission is required';
        }
        if (details.aboutus.trim() === "") {
            errors.aboutus = "*Company's about is required";
        }
        setFormErrors(errors);
        return errors;
    }

    const handleDetails = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev, [name]: value
        }));
    }

    const handleBack = (e) => {
        e.preventDefault();
        const formData = {
            details
        };
        navigate('/company', { state: formData });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = runValidations();

        if (Object.keys(errors).length === 0) {
            const formData = {
                username: state.formData.username,
                email: state.formData.email,
                password: state.formData.password,
                role: state.formData.role,
                companyname: state.companyname,
                GST: state.GST,
                contactdetails: state.contactdetails,
                details
            };

            try {
                const companyData = await axios.post('/api/company/register', formData);
                console.log(companyData.data);
                localStorage.clear();
                navigate('/login')
            } catch (e) {   
                setServerErrors(e.response.data.errors)
            }
        }
    }

    return (
        <div className="d-flex justify-content-center mt-3">
            <Card className="rounded  'shadow p-3 mb-5 bg-body-tertiary rounded'" style={{ width: '400px' }}>
                <Card.Body>
                    <h2>Company Details</h2>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>About Company</Form.Label>
                            <Form.Control
                                as="textarea"
                                id="aboutus"
                                name="aboutus"
                                value={details.aboutus}
                                onChange={handleDetails}
                                className={formErrors.aboutus ? 'is-invalid' : ''}
                            />
                            {formErrors.aboutus && (
                                <div className="invalid-feedback">{formErrors.aboutus}</div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Company Mission</Form.Label>
                            <Form.Control
                                as="textarea"
                                id="mission"
                                name="mission"
                                value={details.mission}
                                onChange={handleDetails}
                                className={formErrors.mission ? 'is-invalid' : ''}
                            />
                            {formErrors.mission && (
                                <div className="invalid-feedback">{formErrors.mission}</div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Company Vision</Form.Label>
                            <Form.Control
                                as="textarea"
                                id="vision"
                                name="vision"
                                value={details.vision}
                                onChange={handleDetails}
                                className={formErrors.vision ? 'is-invalid' : ''}
                            />
                            {formErrors.vision && (
                                <div className="invalid-feedback">{formErrors.vision}</div>
                            )}
                        </Form.Group>
                        <div className="d-flex justify-content-between mt-3">
                            <Button variant="primary" onClick={handleBack}>Back</Button>
                            <Button variant="success" onClick={handleSubmit}>Submit</Button>
                        </div>

                        {serverErrors && serverErrors.length > 0 && (
                            <div className="mt-3">
                                {serverErrors.map((ele, index) => (
                                    <li key={index}>{ele.msg}</li>
                                ))}
                            </div>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CompanyDetails;
