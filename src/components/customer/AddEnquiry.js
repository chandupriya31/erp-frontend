import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAddEnquiry } from "../../actions/enquiry-action";

function AddEnquiry() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [phNo, setPhNo] = useState('');
  const [quantity, setQuantity] = useState('');
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/products/list');
        const companies = await axios.get('/api/companies/list');
        setProducts(response.data);
        setCompanies(companies.data);
      } catch (e) {
        console.log(e.response.data.errors);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (productId) {
          const productDetails = await axios.get(`/api/productdetails/${productId}`);
          setCompany(productDetails.data.companyId._id);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [productId]);

  function runValidations() {
    const errors = {};

    if (productId.length === 0) {
      errors.productId = '* Select the product';
    }

    if (phNo.length === 0) {
      errors.phNo = '* Phone number required';
    } else if (phNo.length !== 10) {
      errors.phNo = '* Enter a valid 10-digit number';
    }

    if (quantity.length === 0) {
      errors.quantity = '* Quantity is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if there are no errors
  }

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    // Run validations
    const isValid = runValidations();

    // If there are errors, don't proceed with the submission
    if (!isValid) {
      return;
    }

    // Rest of the code remains unchanged
    const formData = {
      productId,
      phNo,
      quantity,
      company,
    };

    dispatch(setAddEnquiry({ formData, navigate }));
    setProductId('');
    setPhNo('');
    setQuantity('');
    setCompany('');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Add Enquiry</h2>
          <form onSubmit={handleEnquirySubmit}>
            <div className="mb-3">
              <label htmlFor="product" className="form-label">Product</label>
              <select
                className={`form-select ${formErrors.productId ? 'is-invalid' : ''}`}
                value={productId}
                onChange={(e) => setProductId(e.target.value)}>
                <option value="">Select product</option>
                {products.map(ele => (
                  <option key={ele._id} value={ele._id}>{ele.productname}</option>
                ))}
              </select>
              <div className="invalid-feedback">{formErrors.productId}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="phNo" className="form-label">Mobile Number</label>
              <input
                type="number"
                className={`form-control ${formErrors.phNo ? 'is-invalid' : ''}`}
                id="phNo"
                value={phNo}
                onChange={(e) => setPhNo(e.target.value)}
              />
              <div className="invalid-feedback">{formErrors.phNo}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                className={`form-control ${formErrors.quantity ? 'is-invalid' : ''}`}
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <div className="invalid-feedback">{formErrors.quantity}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="company" className="form-label">Company</label>
              <select
                className="form-select"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}>
                <option value="">Select Company</option>
                {companies.map(ele => (
                  <option key={ele._id} value={ele._id}>{ele.companyname}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEnquiry;
